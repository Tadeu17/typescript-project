type WhereToInsertElement = "afterbegin" | "beforeend";

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement!: HTMLTemplateElement;
  toBeAddedElement: T;
  whereToAddElement: U;

  constructor(
    templateId: string,
    targetElementId: string,
    whereToAddElement: WhereToInsertElement = "afterbegin",
    toBeAddedElementId?: string
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateId)
    );
    this.whereToAddElement = document.getElementById(targetElementId)! as U;
    const importNode = document.importNode(this.templateElement.content, true);

    this.toBeAddedElement = importNode.firstElementChild! as T;
    if (toBeAddedElementId) {
      this.toBeAddedElement.id = toBeAddedElementId;
    }

    this.attach(whereToAddElement)

  }

  private attach(whereToAddElement: WhereToInsertElement): void {
    this.whereToAddElement.insertAdjacentElement(whereToAddElement, this.toBeAddedElement);
  };
}
