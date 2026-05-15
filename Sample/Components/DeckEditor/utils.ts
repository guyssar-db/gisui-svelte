import type { Card } from './types';
export const isRotated = (card: Card | null) => {
	if (!card) return false;
	const type = card.type || '';
	return (
		type.includes('ไม้ตาย') ||
		type.includes('Impact') ||
		type.includes('สเปเชียล') ||
		type.includes('Special')
	);
};

export const getWeight = (card: Card, buddyId: string | string[] | null) => {
	const type = card.type || '';
	const name = card.name || '';
	const isBuddy = Array.isArray(buddyId) ? buddyId.includes(card.id) : card.id === buddyId;

	if (type.includes('แฟลก') || type.includes('Flag')) {
		if (name === 'the Chaos' || name === 'เดอะ เคออส') return -2;
		if (name.includes('Infinity') || name.includes('อินฟินิตี้') || name.includes('∞')) return -1;
		if (name.includes('the Chaos') || name.includes('the เคออส')) return 0;
		return 1;
	}
	if (isBuddy) return 2;
	if (
		type.includes('มอนสเตอร์') ||
		type.includes('Monster') ||
		type.includes('คาแรคเตอร์') ||
		type.includes('Character')
	)
		return 3;
	if (
		type.includes('เวทมนตร์') ||
		type.includes('Spell') ||
		type.includes('อีเวนท์') ||
		type.includes('Event')
	)
		return 4;
	if (
		type.includes('ไอเท็ม') ||
		type.includes('Item') ||
		type.includes('สเปเชียล') ||
		type.includes('Special')
	)
		return 5;
	if (
		(type.includes('ไม้ตาย') || type.includes('Impact')) &&
		!type.includes('มอนสเตอร์') &&
		!type.includes('Monster')
	)
		return 6;
	if (type.includes('มอนสเตอร์ไม้ตาย') || type.includes('Impact Monster')) return 7;
	if (type.includes('บัดดี้กิฟต์') || type.includes('Buddy Gift')) return 8;
	if (type.includes('อัลติเมท') || type.includes('Ultimate')) return 9;
	return 10;
};

export const isLostOrBio = (card: Card) => {
	const cw = card.world;
	const worlds = Array.isArray(cw) ? cw : [cw];
	return worlds.includes('ไบโอแลปดันเจี้ยน') || worlds.includes('ลอสต์เวิลด์');
};

export const MAIN_FLAG_EXCEPTIONS = [
	'ก็อดคล็อก',
	'คล็อก-I',
	'คล็อก-II',
	'คล็อก-III',
	'เทพเจ้าแห่งกาลเวลาที่แท้จริง, ดิ・เอนด์รูเลอร์・ดราก้อน'
];

export const SPECIAL_BUDDIES = [
	'จตุรอาชาแห่งวันสิ้นโลกคนที่หนึ่ง, กราโทส “Re：B”',
	'จตุรอาชาแห่งวันสิ้นโลกคนที่สอง, โวเรมอส',
	'จตุรอาชาแห่งวันสิ้นโลกคนที่สาม, อาแบร์รูเซีย',
	'จตุรอาชาแห่งวันสิ้นโลกคนที่สี่, ธานาทอส',
	'เทพอัคคี, แม็กม่า・ฮอรัส',
	'เทพน้ำแข็ง, ฟรีซ่า・ฮอรัส',
	'เทพอัคคีแห่งตำนาน, แม็กม่า・ฮอรัส',
	'เทพน้ำแข็งแห่งตำนาน, ฟรีซ่า・ฮอรัส',
	'เทพอัสนีแห่งตำนาน, โวลเทค・ราห์',
	'เทพอัสนี, โวลเทค・ราห์',
	'จอมเทพปีศาจแห่งภัยพิบัติ, ยามิเกโดร้อยหน้า "ครึ่งแผ่นฟ้า"',
	'จอมเทพปีศาจแห่งภัยพิบัติ, ยามิเกโดร้อยหน้า "ครึ่งแผ่นดิน"'
];

export const isSpecialFlag = (card: Card) => {
	const name = card.name || '';
	const type = card.type || '';
	if (!(type.includes('แฟลก') || type.includes('Flag'))) return false;

	return (
		name.includes('ลอสต์เวิลด์') ||
		name.includes('Lost World') ||
		name.includes('ไบโอแลปดันเจี้ยน') ||
		name.includes('ไบโอแลป') ||
		name.includes('Bio-lab') ||
		name.includes('ไดร') ||
		name.includes('Drei') ||
		name.includes('โอเวอร์ก็อด') ||
		name.includes('the Chaos') ||
		name.includes('the เคออส') ||
		name.includes('Infinity') ||
		name.includes('เคออส') ||
		name.includes('∞')
	);
};

export const isBuddyGift = (card: Card) => {
	const type = card.type || '';
	return type.includes('บัดดี้กิฟต์') || type.includes('Buddy Gift');
};

export const isUltimate = (card: Card) => {
	const type = card.type || '';
	return type.includes('อัลติเมท') || type.includes('Ultimate');
};
