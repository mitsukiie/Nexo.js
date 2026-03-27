import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Subiu, rodou, respondeu',
    description: (
      <>
        Configure em minutos e começe com comandos e eventos sem boilerplate
        gigante. Simples no inicio e escalavel no crescimento.
      </>
    ),
  },
  {
    title: 'JS e TS lado a lado',
    description: (
      <>
        A documentação mostra exemplos reais nas duas opções, para voce usar o
        mesmo fluxo no stack que preferir.
      </>
    ),
  },
  {
    title: 'Node ou Bun, voce escolhe',
    description: (
      <>
        Runtime não precisa travar seu projeto. Os guias cobrem execução e
        instalação para Node.js e Bun.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className="col col--4">
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
