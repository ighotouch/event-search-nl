## Getting Started

1. Go to the repository on GitHub and click the "Fork" button.

Then, clone your forked repository:

```bash
git clone <https://github.com/In2Event/assignment-sam.git>
cd <assignment-sam>
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

For more information on what to do, read `docs/assignment.md`.

## Implementation Notes

All points in the test were doc here `docs/assignment.md` were attended to a lot of person decisions were made 
in the implementation which i am happy to discuss during the next call and if there are any questions i need to clearify.

One of the significant components of this project is the Generic Table. I chose to make this table generic, considering that we are working within an event management context. This flexibility allows us to accommodate various table structures in the future, ensuring the component can be easily extended to meet evolving needs. For more information on how to extend this component, please refer to the documentation in `implementation-table.md`.

Testing
For the initial test data, I opted to mock some well-known musicians from Germany and the Netherlands. This decision adds a touch of relevance, as these musicians might be potential clients booking events with our firm.

I aimed to utilize the existing tools installed in the project, specifically Vitest, to cover as many test scenarios as possible. However, due to time constraints, I was only able to dedicate six hours to this task, which limited the extent of the testing.



## Tech Stack (In2event)

- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Form Validation**: Zod
- **Form Handling**: React Hook Form
- **Table Management**: [TanStack Table](https://tanstack.com/table)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
