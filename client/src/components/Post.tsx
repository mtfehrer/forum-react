type Props = {
    data: { title: string; content: string; username: string; date: string };
};

const Post: React.FC<Props> = ({ data }: Props) => {
    return (
        <div className="post">
            <span>Title: {data.title}</span>
            <span>Content: {data.content}</span>
            <span>User: {data.username}</span>
            <span>Date: {data.date}</span>
        </div>
    );
};

export default Post;
