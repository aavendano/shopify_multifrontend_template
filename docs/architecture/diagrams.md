# System Diagrams

## Component Hierarchy

The following diagram illustrates the Atomic Design hierarchy implemented in the project.

```{mermaid}
graph TD
    subgraph Atoms
        A1[Button]
        A2[Input]
        A3[Image]
        A4[TextBlock]
    end

    subgraph Molecules
        M1[ProductPrice]
        M2[CardContent]
        M3[FormField]
    end

    subgraph Organisms
        O1[ProductCard]
        O2[ProductDetails]
        O3[CartDrawer]
    end

    M1 --> A4
    M2 --> M1
    M2 --> A4
    O1 --> M2
    O1 --> A1
    O2 --> M1
    O2 --> A1
```

## Data Flow & Event Architecture

The system relies on a unidirectional data flow for props and an event-bubbling mechanism for user interactions.

```{mermaid}
sequenceDiagram
    participant User
    participant Page as Astro Page
    participant Organism as ProductDetails (Org)
    participant Molecule as QuantitySelector (Mol)
    participant Atom as Button (Atom)

    Page->>Organism: Renders with Product Data
    Organism->>Molecule: Passes initial quantity
    Molecule->>Atom: Renders Button (+)

    User->>Atom: Clicks (+)
    Atom-->>Molecule: Native Click Event
    Molecule->>Molecule: Updates internal state
    Molecule->>Organism: Dispatches 'quantity-change' Event
    Organism->>Organism: Updates Cart State (via Store/JS)
```

## Shopify Mock Integration

How the frontend interacts with the mock backend.

```{mermaid}
flowchart LR
    Frontend[Frontend Component]
    MockAdapter[src/lib/shopify/mockClient.ts]
    MockData[Hardcoded Data]

    Frontend -- calls getProductVariant('sale') --> MockAdapter
    MockAdapter -- queries --> MockData
    MockData -- returns JSON --> MockAdapter
    MockAdapter -- returns Promise<Product> --> Frontend
```
