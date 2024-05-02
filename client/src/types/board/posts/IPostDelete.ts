interface IPostDeleteWithId {
  id: number;
}

interface IPostDeleteWithOtherOptions {
  title?: string;
  likes?: number;
  text?: string;
  // comments: CommentModel[];
  // section: Section;
}

type IPostDelete = IPostDeleteWithId | IPostDeleteWithOtherOptions;

export default IPostDelete;