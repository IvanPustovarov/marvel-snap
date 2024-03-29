export interface Card {
  name: string
  description: string
  cost: number
  power: number
  pool: number
  onReveal: boolean
  ongoing: boolean
  move: boolean
  destroy: boolean
  noAbility: boolean
  draw: boolean
  discard: boolean
  release: boolean,
  name_ru: string
}
