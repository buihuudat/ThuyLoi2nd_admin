import React, { useState } from "react";
import _ from "lodash";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

import SearchAppBar from "./search";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import PostCard from "./PostCard";
import AddModal from "./modals/addModal";
import { useDispatch } from "react-redux";
import { setAddModal } from "../../../../redux/reducers/modalReducer";
import UpdateModal from "./modals/ViewPostProductModal";
import { useEffect } from "react";
import { dataCateGories, post_status } from "../../../../data";
import postProductApi from "../../../../api/postProductApi";

const AddToggle = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setAddModal(true));
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        flexGrow: 1,
      }}
    >
      <IconButton onClick={handleClick}>
        <AddIcon sx={{ width: 50, height: 50 }} color="warning" />
      </IconButton>
    </Box>
  );
};

const Products = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState("access");
  const [type, setType] = useState("dientu");
  const [loadingSm, setLoadingSm] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      const data = await postProductApi.gets();
      setPosts(data);
      setLoading(false);
    };
    getPosts();
  }, [loadingSm]);

  const handleClick = (e) => {
    setTab(e);
    setType(dataCateGories[e].type);
  };

  console.log(
    _.filter(posts, {
      category: type,
      status_check_post: option,
    }),
    option
  );

  return (
    <Box>
      <SearchAppBar />
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            flexWrap: "nowrap",
            justifyContent: "center",
          }}
        >
          {dataCateGories.map((data, index) => (
            <Card
              key={index}
              sx={
                index === tab
                  ? {
                      backgroundColor: "orange",
                      color: "#fff",
                      minWidth: "150px",
                      height: "max-content",
                    }
                  : {
                      height: "max-content",
                      minWidth: "150px",
                    }
              }
            >
              <CardActionArea
                onClick={() => handleClick(index)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  alignItems: "center",
                  background: `url(${data.source})`,
                  height: 100,
                }}
              >
                <CardContent
                  sx={{
                    width: "100%",
                    height: 100,
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <Typography pt={1} fontWeight={600}>
                    {data.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Box>
          <Box
            pt={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 3,
            }}
          >
            <Typography variant={"h5"} fontWeight={600}>
              Bài đăng
            </Typography>
            <FormControl variant="standard">
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Sắp xếp
              </InputLabel>
              <NativeSelect
                defaultValue={option}
                onChange={(e) =>
                  setOption(Object.keys(post_status)[e.target.value])
                }
                inputProps={{
                  name: "priceUp",
                  id: "uncontrolled-native",
                }}
              >
                <option value={0}>Access</option>
                <option value={1}>Pending</option>
                <option value={2}>Refuse</option>
              </NativeSelect>
            </FormControl>
          </Box>
          {loading ? (
            <Box>
              <LinearProgress />
            </Box>
          ) : posts.length <= 0 ? (
            <Typography fontSize={20} mt={5} align="center" fontWeight={600}>
              Chưa có bài đăng
            </Typography>
          ) : (
            <Grid
              container
              spacing={3}
              p={3}
              sx={{ overflowY: "auto", height: 650 }}
            >
              {_.filter(posts, {
                category: type,
                status_check_post: option,
              }).map((data, index) => (
                <Grid key={index} item>
                  <PostCard setLoadingSm={setLoadingSm} props={data} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      <AddToggle />
      <AddModal setLoadingSm={setLoadingSm} />
      <UpdateModal />
    </Box>
  );
};

export default Products;
