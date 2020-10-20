import React from 'react'

export default function LinkCard({ link, refreshLinks }) {
    const archiveLink = async () => {
        link.archived = !link.archived;
        try {
            await fetch('/.netlify/functions/updateLink', {
                method: 'PUT',
                body: JSON.stringify(link)
            })
            refreshLinks();
        } catch (error) {
            console.log(error)
        }
    }
    const deleteLink = async () => {
        console.log(link._id)
        try {
            await fetch('/.netlify/functions/deleteLink', {
                method: 'DELETE',
                body: JSON.stringify({ _id: link._id })
            })
            refreshLinks();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="card">
            <div className="card-header">{link.name}</div>
            <div className="card-body">
                <a href={link.url}>{link.url}</a>
                <p>{link.description}</p>
            </div>
            <div className="card-footer">
                <button className="btn btn-warning mr-2" onClick={archiveLink}>Archive</button>
                <button className="btn btn-danger mr-2" onClick={deleteLink}>Delete</button>
            </div>
        </div>
    )
}
