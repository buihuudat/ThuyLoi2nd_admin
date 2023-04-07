import * as React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUpdateModal } from "../../../../redux/reducers/modalReducer";

const SearchResult = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function SearchResults({ results }) {
  const dispatch = useDispatch();
  const handleView = (e) => {
    dispatch(setUpdateModal({ type: true, data: e }));
  };
  return (
    <List
      sx={{
        backdropFilter: "blur(50px)",
        maxWidth: 500,
        p: 1,
        cursor: "pointer",
      }}
    >
      {results.map((result) => (
        <SearchResult
          key={result._id}
          sx={{
            background: "#fff",
            padding: 1,
            display: "flex",
            flexDirection: "row",
            gap: 3,
            width: "100%",
            height: "auto",
          }}
        >
          <Avatar
            src={result.images[0].url}
            alt={result.title}
            variant="square"
          />
          <ListItemText
            primary={result.title}
            secondary={
              result.description.length > 50
                ? result.description.slice(0, 50) + "..."
                : result.description
            }
            sx={{
              color:
                result.status_check_post === "access"
                  ? "green"
                  : result.status_check_post === "pending"
                  ? "yellow"
                  : "red",
            }}
            onClick={() => handleView(result)}
          />
        </SearchResult>
      ))}
    </List>
  );
}
