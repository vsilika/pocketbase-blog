


type PostCardProps = {
  title: string;
  subtitle: string;
  blogText: string;
  id: number;
  author: string;
  // onDelete: (id: number) => void;
  onDelete: Function;
  onEdit: (id: number) => void;

};

const PostCard = ({ title, subtitle, blogText, id, onDelete, author, onEdit }: PostCardProps) => {
  return (
    <div className="post-card">
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <p>{blogText}</p>
      <div><p>Author: </p>
        <span>
          {author}
        </span>
      </div>
      <div className="post-card-buttons">
        <button onClick={() => onDelete(id)}>Delete</button>
        <button onClick={() => onEdit(id)}>Edit</button>
      </div>
    </div>
  );
}

export default PostCard;
