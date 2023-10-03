import { cn } from "@/lib/utils";
import { DetailedHTMLProps, forwardRef } from "react";
import { Link } from "react-router-dom";

type ListProps = {
  isOrdered?: boolean;
  className?: string;
  listItemStyle?: string;
  isLink: boolean;
  list: string[];
};

type List = DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> &
  DetailedHTMLProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > &
  ListProps;

const List = forwardRef(function List(
  { isOrdered, className, listItemStyle, isLink, list, ...props }: List,
  ref: React.ForwardedRef<HTMLUListElement & HTMLOListElement>
) {
  const listStyleCSS = cn(className, "flex flex-col");

  const content = list.map((item) => {
    let innerContent;
    if (isLink) {
      innerContent = (
        <Link to={item.id} className="block">
          {item.name}
        </Link>
      );
    } else {
      innerContent = item.name;
    }
    return (
      <li className={cn(listItemStyle, "")} key={item.id}>
        {innerContent}
      </li>
    );
  });

  if (isOrdered)
    return (
      <ol className={listStyleCSS} {...props} ref={ref}>
        {content}
      </ol>
    );
  return (
    <ul className={listStyleCSS} {...props} ref={ref}>
      {content}
    </ul>
  );
});

export default List;
