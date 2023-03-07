export function getTime() {
	const now = new Date()
	const formattedDate = now
		.toISOString()
		.replace(/T/, ' ')
		.replace(/\.\d+Z/, '')

	return formattedDate
}
export function formatTime(datetimeString) {
	const datetime = new Date(Date.parse(datetimeString))
	return datetime.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	})
}
