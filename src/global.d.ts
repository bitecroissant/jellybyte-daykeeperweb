var isDev: boolean

type JSONValue = string | number | boolean | null | { [k: string]: JSONValue } | JSONValue[]

// Biz
type PoetryLinesType = {
	id: number
	gmtCreate: string
	gmtModified: string
	isDeleted: number
	line: string
	author: string
	dynasty: string
	title: string
	showDate: string
	createBy: string
}

type EventDatesTypes = {
	id: number | string
	gmtCreate: string
	gmtModified: string
	isDeleted: number
	group: string
	eventName: string
	happenAt: string
	iconName: string
	iconColor: string
	emojiIcon: string
	datesStatus: string
}

type UserTokens = {
    user: string
    token: string
	jwt: string
}