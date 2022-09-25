interface Props {
    title: string
    content?: string
}

const GenericPage: React.FC<Props> = ({title, content}: Props) => {
    return (
        <div className="generic-container">
            <h1>{title}</h1>
            {content ? <p>{content}</p> : null}
        </div>
    )
}

export default GenericPage