import { useLocation } from "react-router-dom";
import css from "./category.module.css";
import Glyph from "../../assets/images/Glyph.svg?react";

const SubCategory = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subItems = JSON.parse(
    decodeURIComponent(searchParams.get("subItems") || "null")
  )



  return (
    <div>
      <h1>SubCategory</h1>
      <div className={css.subItems}>
        {subItems.map((subItem: any) => (
          <button
            className={`${css.claim} ${css.subcat}`}
            key={subItem.id}
            style={{ backgroundColor: "pink" }}
          >
            <div className={css.claimInfo}>
              <h2>{subItem.title}</h2>
            </div>
            <Glyph />
          </button>
        ))}
      </div>
    </div>
  );
};

export { SubCategory };
