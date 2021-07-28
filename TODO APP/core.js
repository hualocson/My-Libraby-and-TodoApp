export default function html([first, ...strings], ...values) {
	return values
		.reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
		.filter((x) => (x && x !== true) || x === 0)
		.join("");
}

// === createStore nhận giá trị của reducer để tạo ra state ban đầu
export function createStore(reducer) {
	let state = reducer();
	// === Lưu root element trong html và các component liên quan
	// ===== tới root
	const roots = new Map();

	// ==== Lặp qua roots để render ra view
	function render() {
		for (const [root, component] of roots) {
			// ==== component là function return ra html
			const output = component();
			root.innerHTML = output;
		}
	}

	// ==== Các phương thức có thể lm việc với createStore
	return {
		// ==== khi attach được gọi thì nó sẽ thực hiện công việc và
		// ===== render ra view
		attach(component, root) {
			roots.set(root, component);
			render();
		},
		// ===== kết nỗi Store và View để có thể đẩy dữ liệu từ Store vào view
		connect(selector = (state) => state) {
			// == props là những công cụ, du lieu để truyền vào component
			return (component) =>
				(props, ...args) =>
					component(Object.assign({}, props, selector(state), ...args));
		},
		dispatch(action, ...args) {
			// === reducer sẽ dựa vào action và sửa lại
			// ==== state => update store
			state = reducer(state, action, args);
			render();
		},
	};
}
