export interface Card {
	id: string;
	cardId: string;
	name: string;
	type: string;
	imagePath: string;
	world: string | string[];
	power: number | null;
	defense: number | null;
	critical: string | null;
	size: string | null;
	attributes: string[];
	ability: string;
	rarity: string | null;
	series: string | null;
}

export interface DeckItem {
	card: Card;
	count: number;
}
