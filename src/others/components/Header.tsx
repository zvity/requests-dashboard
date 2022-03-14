import { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FilterDropdownGroup } from "./FilterDropdown/FilterDropdownGroup";
import { Box } from "@mui/material";
import { useFilter } from "../contexts/filter";

import { useSidebarContext } from "./sidebar-context";
import { TimelineSlider } from "./TimelineSlider";

export interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const { toggle } = useSidebarContext();
  const { filters, activateFilter, toggleFilterItem } = useFilter();

  const { Dates: dateFilter, ...otherFilters } = filters;

  const dates = dateFilter?.filterItems.map(({ text }) => text) || [];

  return (
    <AppBar position="static" sx={{ paddingRight: 1, paddingLeft: 1, backgroundImage: null }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 8, display: "flex", alignItems: "center" }}>
          <FilterDropdownGroup
            filters={Object.values(otherFilters)}
            filterGroupOpenHandler={activateFilter}
            filterGroupUpdateHandler={toggleFilterItem}
          />
          {dates && <TimelineSlider dates={dates} />}
        </Box>
        {children}
      </Toolbar>
    </AppBar>
  );
};
