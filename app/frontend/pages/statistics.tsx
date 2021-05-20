import Layout from "../components/layouts/Layout";
import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import HourlyRequestChart from "../components/statistics/requestCharts/HourlyRequestChart";
import DailyRequestChart from "../components/statistics/requestCharts/DailyRequestChart";
import MonthlyRequestChart from "../components/statistics/requestCharts/MonthlyRequestChart";
import HourlyAvgFinishTimeChart from "../components/statistics/avgFinishTimeCharts/HourlyAvgFinishTimeChart";
import DailyAvgFinishTimeChart from "../components/statistics/avgFinishTimeCharts/DailyAvgFinishTimeChart";
import MonthlyAvgFinishTimeChart from "../components/statistics/avgFinishTimeCharts/MonthlyAvgFinishTimeChart";
import LoginRequired from "../components/LoginRequired";

export default function Statistics() {
  return (
    <LoginRequired>
      <Layout>
        <Center minHeight="100vh">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 20, md: 10 }} w="container.lg" py="16" px="2">
            <Box>
              <HourlyRequestChart />
            </Box>
            <Box>
              <DailyRequestChart />
            </Box>
            <Box>
              <MonthlyRequestChart />
            </Box>
            <Box>
              <HourlyAvgFinishTimeChart />
            </Box>
            <Box>
              <DailyAvgFinishTimeChart />
            </Box>
            <Box>
              <MonthlyAvgFinishTimeChart />
            </Box>
          </SimpleGrid>
        </Center>
      </Layout>
    </LoginRequired>
  );
}
