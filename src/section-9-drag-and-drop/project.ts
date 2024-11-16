class UniqueId {
  private id: number = 0;

  getNewId() {
    return ++this.id;
  }
}

export enum ProjectStatus {
  Active,
  Finished,
}

export class Project {
  id: number = 0;

  constructor(
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {
    const uniqueId = new UniqueId();
    this.id = uniqueId.getNewId();
  }
}
