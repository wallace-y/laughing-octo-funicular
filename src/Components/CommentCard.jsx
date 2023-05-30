function CommentCard() {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">Subheading</div>
        Content for list item
      </div>
      <span className="badge bg-primary rounded-pill">14</span>
    </li>
  );
}

export default CommentCard;
