import Post from "./Post";

type Props = {
    postList: {
        title: string;
        content: string;
        username: string;
        date: string;
    }[];
};

const Home: React.FC<Props> = ({ postList }: Props) => {
    return (
        <div className="home-container">
            <h1>Home</h1>
            {postList.map((p) => {
                return <Post data={p} key={Math.random()} />;
            })}
        </div>
    );
};

export default Home;
