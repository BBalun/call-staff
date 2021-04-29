import React from "react";
import Layout from "../components/layouts/layout";
import { Box, Center, Container, SimpleGrid } from "@chakra-ui/react";
import HourlyRequestChart from "../components/statistics/requestCharts/hourlyRequestChart";
import DailyRequestChart from "../components/statistics/requestCharts/dailyRequestChart";
import MonthlyRequestChart from "../components/statistics/requestCharts/monthlyRequestChart";

import HourlyAvgFinishTimeChart from "../components/statistics/avgFinishTimeCharts/hourlyAvgFinishTimeChart";
import DailyAvgFinishTimeChart from "../components/statistics/avgFinishTimeCharts/dailyAvgFinishTimeChart";
import MonthlyAvgFinishTimeChart from "../components/statistics/avgFinishTimeCharts/monthlyAvgFinishTimeChart";

export default function Statistics() {
  return (
    <Layout>
      <Center minHeight="100vh">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="container.md">
          <HourlyRequestChart />
          <DailyRequestChart />
          <MonthlyRequestChart />
          <HourlyAvgFinishTimeChart />
          <DailyAvgFinishTimeChart />
          <MonthlyAvgFinishTimeChart />
        </SimpleGrid>
      </Center>
    </Layout>
  );
}
