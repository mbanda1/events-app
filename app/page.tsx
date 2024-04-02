import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import LatestEvents from "./latestEvents";
import SummaryChart from "./summaryChart";
import SummaryPage from "./summaryPage";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.events.count({
    where: {
      status: 'OPEN'
    }
  })

  const inProgress = await prisma.events.count({
    where: {
      status: 'IN_PROGRESS'
    }
  })

  const closed = await prisma.events.count({
    where: {
      status: 'CLOSED'
    }
  })

  return (
    <Grid columns={{initial: '1', md:'2'}} gap={'5'}>
      <Flex direction={'column'} gap={'2'}>
        <SummaryPage open={open} inProgress={inProgress} closed={closed} />
        <SummaryChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestEvents />
    </Grid>
  );
}


export const metadata: Metadata = {
  title: 'Event management app',
  description: 'Even inventory app'
}