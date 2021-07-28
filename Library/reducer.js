const init = {
	cars: ["BMW"],
};

// === lần đầu tiên reducer được gọi nó không truyền đối số
// === nên sẽ return về init
export default function reducer(state = init, action, args) {
	switch (action) {
		case "ADD":
			const [newCar] = args;
			return {
				...state,
				cars: [...state.cars, newCar],
			};
		case "REMOVE":
			state.cars.pop();
		default:
			return state;
	}
}
