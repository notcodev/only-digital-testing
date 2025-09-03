import { Classes } from './components/classes'
import { HistoricalDates } from './components/historical-dates/ui'
import { Container } from './components/ui/container'
import { data } from './data'

export const Application = () => (
  <>
    <Classes />
    <Container>
      <HistoricalDates data={data} />
    </Container>
  </>
)
