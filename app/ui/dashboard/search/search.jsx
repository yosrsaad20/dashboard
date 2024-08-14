"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const query = e.target.value;
    const params = new URLSearchParams(searchParams);

    params.set("page", 1); // Reset to the first page on new search

    if (query) {
      // Update the query parameter
      params.set("q", query);
    } else {
      // Remove the query parameter if input is cleared
      params.delete("q");
    }

    // Navigate to the updated URL with the search parameters
    replace(`${pathname}?${params}`);
  }, 300); // Debounce input for 300ms

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
        defaultValue={searchParams.get('q') || ''} // Set the initial value based on searchParams
      />
    </div>
  );
};

export default Search;
