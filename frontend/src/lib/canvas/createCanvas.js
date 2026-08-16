import { Canvas } from 'fabric'

export function createCanvas(element) {
  const canvas = new Canvas(element, {
    preserveObjectStacking: true,
    selection: true,
    renderOnAddRemove: true
  })

  return canvas
}