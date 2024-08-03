type EntityId = number & { __brand: "EntityId" } // Uint32
type ComponentId = number & { __brand: "ComponentId" } // Uint32
type ArchetypeId = number & { __brand: "ArchetypeId" } // Uint32
type Type = Uint32Array
type Column<T> = T[]

interface Archetype {
	id: ArchetypeId,
	type: Type,
	components: Column<any>[]
	edges: Map<ComponentId, Edge>
}

interface Edge {
	add: Archetype,
	remove: Archetype
}

interface EntityRecord {
	archetype: Archetype,
	row: number,
}

let archetype_index: Map<Type, Archetype>
let entity_index: Map<EntityId, EntityRecord>
let component_index: Map<EntityId, Map<Archetype, number>>
