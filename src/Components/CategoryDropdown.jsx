import { useSearchParams } from "react-router-dom";

function Dropdown({ categories, selectedCategory, setSelectedCategory }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilterCategory = (selectedCategory) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", selectedCategory);
    setSearchParams(newParams);
  };

  return (
    <section>
      <label htmlFor="category-choice">Filter by:</label>

      <select
        id="all-categories"
        onChange={(event) => {
          setFilterCategory(event.target.value);
        }}
      >
        <option value="" defaultValue className="text-capitalize">
          Show All
        </option>
        {categories.map((category) => {
          return (
            <option key={category.slug} className="text-capitalize">
              {" "}
              {category.slug}
            </option>
          );
        })}
      </select>
    </section>
  );
}

export default Dropdown;
