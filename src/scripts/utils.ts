const random = () => Math.round(Math.random() * 10)

export const delayMaybeError = async () => {
	await new Promise((resolve, reject) => {
		setTimeout(() => {
			const num = random()
			if (num === 5) {
				reject()
			} else {
				resolve(num)
			}
		}, 2_000)
	})
}
