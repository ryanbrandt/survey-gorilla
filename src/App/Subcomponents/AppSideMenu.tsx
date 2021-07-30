import React, { useState, useEffect } from "react";

import { SideMenu } from "handsome-ui";

import { history, ROUTES } from "../../routes";

export enum MENU_OPTION {
  dashboard = "Survey Dashboard",
  creation = "Survey Creation",
}

const AppSideMenu = (): React.ReactElement => {
  const DASHBOARD_REGEX = /^\/dashboard$/;
  const CREATION_REGEX = /^\/create-survey$/;

  const computeActiveMenuItem = (): MENU_OPTION | null => {
    const { location } = history;
    const { pathname } = location;

    let newActiveMenuItem: MENU_OPTION | null = null;
    if (pathname.match(DASHBOARD_REGEX)) {
      newActiveMenuItem = MENU_OPTION.dashboard;
    } else if (pathname.match(CREATION_REGEX)) {
      newActiveMenuItem = MENU_OPTION.creation;
    }

    return newActiveMenuItem;
  };

  const [activeMenuItem, setActiveMenuItem] = useState<MENU_OPTION | null>(
    computeActiveMenuItem()
  );

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);

      setActiveMenuItem(computeActiveMenuItem());
    });

    return () => unlisten();
  }, []);

  const SIDE_MENU_ITEMS = [
    {
      name: "Survey Dashboard",
      action: () => history.push(ROUTES.dashboard),
      active: activeMenuItem === MENU_OPTION.dashboard,
    },
    {
      name: "Create Survey",
      action: () => history.push(ROUTES.creation),
      active: activeMenuItem === MENU_OPTION.creation,
    },
  ];

  return <SideMenu options={SIDE_MENU_ITEMS} />;
};

export default AppSideMenu;
