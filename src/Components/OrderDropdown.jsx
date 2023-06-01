function OrderDropdown({ searchParams, setSearchParams }) {
  const setOrderQuery = (selectedOrder) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", selectedOrder);
    setSearchParams(newParams);
  };

  return (
    <section>
      <select
        className="form-select"
        id="all-filters"
        onChange={(event) => {
          setOrderQuery(event.target.value);
        }}
      >
        <option value="" defaultValue className="text-capitalize">
          Default order
        </option>
        <option value="ASC" defaultValue className="text-capitalize">
          Ascending
        </option>
        <option value="DESC" defaultValue className="text-capitalize">
          Descending
        </option>
      </select>
    </section>
  );
}

export default OrderDropdown;
