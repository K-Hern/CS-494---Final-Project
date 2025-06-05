import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Budget } from '@/types/budget';
import { useState } from 'react';

export default function SelectActionCard(props: {budgets: Budget[]}) {
  const [selectedCard, setSelectedCard] = useState<string>();
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {props.budgets.map((budget, index) => (
        <Card key={index}>
          <CardActionArea
            onClick={() => setSelectedCard(budget.id)}
            data-active={selectedCard === budget.id ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {budget.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {budget.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
