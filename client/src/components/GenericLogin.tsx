import React from "react"

interface Props {
    title: string
    onChange: (field: string, input: string) => void
    onSubmit: (event: React.FormEvent) => void
}

const GenericLogin: React.FC<Props> = ({title, onChange, onSubmit}: Props) => {
    return (
        <div className="login-container">
            <h1>{title}</h1>
            <form className="login-form" onSubmit={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input id="username" className="login-input" onChange={(event) => {onChange("username", event.target.value)}}></input>
                <label htmlFor="password">Password:</label>
                <input id="password" className="login-input" onChange={(event) => {onChange("password", event.target.value)}}></input>
                <button className="btn" type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default GenericLogin