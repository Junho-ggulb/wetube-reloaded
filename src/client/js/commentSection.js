const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
const comments = videoComments.querySelectorAll("li");
const addComment = (text, newCommentId) => {

    const newComment = document.createElement("li");
    newComment.className = "video__comment"
    newComment.dataset.id = newCommentId
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    span2.addEventListener("click", () => {
        handleDeleteComment(newComment)
    })
    videoComments.prepend(newComment)
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    let text = textarea.value;
    const id = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${id}/comment`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ text })
    });
    const { newCommentId } = await response.json()

    textarea.value = "";
    if (response.status === 201) {
        addComment(text, newCommentId);
    }


}

if (form) {
    form.addEventListener("submit", handleSubmit)
}

const handleDeleteComment = async (comment) => {
    const id = videoContainer.dataset.id;
    const commentId = comment.dataset.id;
    const { status } = await fetch(`/api/videos/${id}/deleteComment/${commentId}`, {
        method: "DELETE"
    })
    if (status === 201) {
        comment.remove()
    }
}

comments.forEach(comment => {
    const btn = comment.querySelector(".comment__delete-btn");
    btn.addEventListener("click", () => {
        handleDeleteComment(comment)
    })
})
