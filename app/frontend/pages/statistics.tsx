import Layout from "../components/layouts/layout";
import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import HourlyRequestChart from "../components/statistics/requestCharts/hourlyRequestChart";
import DailyRequestChart from "../components/statistics/requestCharts/dailyRequestChart";
import MonthlyRequestChart from "../components/statistics/requestCharts/monthlyRequestChart";
import HourlyAvgFinishTimeChart from "../components/statistics/avgFinishTimeCharts/hourlyAvgFinishTimeChart";
import DailyAvgFinishTimeChart from "../components/statistics/avgFinishTimeCharts/dailyAvgFinishTimeChart";
import MonthlyAvgFinishTimeChart from "../components/statistics/avgFinishTimeCharts/monthlyAvgFinishTimeChart";
import LoginRequired from "../components/loginRequired";

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
