import styles from './HomepageFeatures.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';


type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Parse math expression',
        image: '/img/binary-code.png',
        description: (
            <>
        Parse mathematical expression. Provide an enhanced syntax to build complex expressions.
            </>
        ),
    },
    {
        title: 'Step by step solution',
        image: '/img/steps.png',
        description: (
            <>
        Solve mathematical expressions and provide a step by step solution as a predefined data structure.
            </>
        ),
    },
    {
        title: 'Build AST',
        image: '/img/hierarchical-structure.png',
        description: (
            <>
        Build abstract syntax tree for your math expression, so you can easily manipulate it.
            </>
        ),
    }
];

function Feature({ title, image, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <img
                    className={styles.featureSvg}
                    alt={title}
                    src={useBaseUrl(image)}
                />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
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
