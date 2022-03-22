/**
 * Seach element by text
 * @param text Text to find
 * @param entities All elements
 */
export function searchByText<T>(text: string, entities: T[]): T[] {
	return entities.filter(entity => {
		const term = text.toLowerCase();
		return entity.name.toLowerCase().includes(term);
	});
}
