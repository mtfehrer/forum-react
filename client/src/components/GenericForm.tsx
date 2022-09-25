import React from "react"

interface Props {
    title: string
    fields: string[]
    onChange: (field: string, input: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const GenericForm: React.FC<Props> = ({title, fields, onChange, onSubmit}: Props) => {

    let fieldElements = []
    for (let field of fields) {
        let keyP = field + "p"
        let keyInput = field + "input"
        fieldElements.push(<p key={keyP} >{field}</p>)
        fieldElements.push(<input key={keyInput} className="form-input" onChange={(e) => {onChange(field, e.target.value)}}></input>)
    }

    return (
        <div className="form-container">
            <h1>{title}</h1>
            <form className="form" onSubmit={onSubmit}>
                {fieldElements}
                <button className="btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default GenericForm