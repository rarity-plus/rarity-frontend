


export interface IInteract {
  onInteract: () => void
}

//TODO: This needs improvement
export function isInteractable(object: unknown) {
   return (object as IInteract).onInteract != undefined
}