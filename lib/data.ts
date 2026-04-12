import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'sham.g.97@gmail.com',

    emailSubject: "Let's connect",
    emailBody: "Hi Shamanth, I came across your portfolio and would like to...",

    linkedinProfile: 'https://www.linkedin.com/in/shamanth-g-bharadwaj',
    githubProfile: 'https://github.com/shamanth-g-bharadwaj',
};

export const SOCIAL_LINKS = [
    { name: 'github',   url: GENERAL_INFO.githubProfile },
    { name: 'linkedin', url: GENERAL_INFO.linkedinProfile },
];

export const MY_STACK = {
    visualisation: [
        { name: 'Power BI',      icon: '/logo/powerbi.svg' },
        { name: 'Metabase',      icon: '/logo/metabase.svg' },
        { name: 'Looker Studio', icon: '/logo/lookerstudio.svg' },
        { name: 'Tableau',       icon: '/logo/tableau.svg' },
        { name: 'Excel',         icon: '/logo/excel.svg' },
    ],
    'data engineering': [
        { name: 'SQL',            icon: '/logo/sql.svg' },
        { name: 'dbt',            icon: '/logo/dbt.svg' },
        { name: 'Trino',          icon: '/logo/trino.svg' },
        { name: 'Apache Iceberg', icon: '/logo/iceberg.svg' },
        { name: 'ETL / ELT',      icon: '/logo/etl.svg' },
        { name: 'Matomo',         icon: '/logo/matomo.svg' },
    ],
    'databases & programming': [
        { name: 'Oracle SQL',   icon: '/logo/oracle.svg' },
        { name: 'PostgreSQL',   icon: '/logo/postgreSQL.png' },
        { name: 'Python',       icon: '/logo/python.svg' },
        { name: 'pandas',       icon: '/logo/pandas.svg' },
        { name: 'NumPy',        icon: '/logo/numpy.svg' },
        { name: 'scikit-learn', icon: '/logo/scikitlearn.svg' },
        { name: 'PySpark',      icon: '/logo/apachespark.svg' },
    ],
    'business analysis': [
        { name: 'Requirements Gathering',   icon: '/logo/requirements.svg' },
        { name: 'Process Analysis',         icon: '/logo/process.svg' },
        { name: 'User Centric Design',      icon: '/logo/userdesign.svg' },
        { name: 'Agile & Scrum',            icon: '/logo/agile.svg' },
        { name: 'Design Thinking',          icon: '/logo/designthinking.svg' },
        { name: 'Stakeholder Management',   icon: '/logo/stakeholder.svg' },
    ],
    tools: [
        { name: 'Git',        icon: '/logo/git.png' },
        { name: 'JIRA',       icon: '/logo/jira.svg' },
        { name: 'Confluence', icon: '/logo/confluence.svg' },
        { name: 'Notion',     icon: '/logo/notion.svg' },
        { name: 'Figma',      icon: '/logo/figma.svg' },
    ],
};

export const MY_EXPERIENCE = [
    {
        title: 'BI Data Engineer',
        company: 'Keelvar',
        logo: '/logo/keelvar.svg',
        duration: 'Nov 2025 – Present',
        location: 'Cork, Ireland',
    },
    {
        title: 'Production Analyst 2',
        company: 'Epsilon',
        logo: '/logo/epsilon.svg',
        duration: 'Apr 2022 – Aug 2024',
        location: 'Bengaluru, India',
    },
    {
        title: 'Production Analyst 1',
        company: 'Epsilon',
        logo: '/logo/epsilon.svg',
        duration: 'Sep 2020 – Apr 2022',
        location: 'Bengaluru, India',
    },
];

export const MY_EDUCATION = [
    {
        degree: 'MSc Business Analytics',
        institution: 'University College Cork',
        duration: 'Sept 2024 – Aug 2025',
        grade: 'First Class Honours',
        location: 'Cork, Ireland',
    },
    {
        degree: 'Bachelor of Engineering',
        institution: 'New Horizon College of Engineering',
        duration: 'Aug 2016 – Aug 2020',
        grade: 'CGPA 8.61 / 10',
        location: 'Bengaluru, India',
    },
];

export const PROJECTS: IProject[] = [
    {
        title: 'F1 2025 Analytics',
        slug: 'f1-analytics',
        liveUrl: 'https://app.powerbi.com/view?r=eyJrIjoiYzRhYWVlMTQtYWM2MS00MmY1LWJlNWQtZjA5NmRkZGRhNGNiIiwidCI6ImViOTE4MGVkLTY2ODYtNDVmZi04MmMxLTliMDEyZGY1MTNlMiIsImMiOjh9',
        sourceCode: 'https://github.com/shamanth-g-bharadwaj/F1_2025_analytics',
        year: 2025,
        description: `An end-to-end motorsport analytics platform — from raw telemetry to interactive dashboard. <br/><br/>
            Ingested and modelled 23+ race datasets from the FastF1 API, engineered a 23-table relational data model in Power BI,
            and built DAX-powered KPIs to analyse driver pace, tyre strategy, qualifying performance, and the championship battle.
            Includes a predictive layer for race winner forecasting.<br/><br/>

            What makes it stand out:<br/>
            <ul>
                <li>Full data engineering exercise — ingestion pipelines, transformation logic, relational modelling, polished self-serve dashboard</li>
                <li>Architecture mirrors production BI: not just visualisation, but structured analytical design</li>
                <li>Predictive modelling layer adds an analytical dimension beyond reporting</li>
                <li>Built independently from genuine passion — the depth shows</li>
            </ul>`,
        role: `Sole Developer & Analyst<br/>
            <ul>
                <li>Designed ingestion pipeline using Python + FastF1 API across 23 race datasets</li>
                <li>Built and optimised a 23-table relational data model in Power BI</li>
                <li>Engineered DAX measures for pace analysis, tyre strategy, and championship simulation</li>
                <li>Built race winner prediction model using Python (pandas, PySpark)</li>
                <li>Published interactive Power BI dashboard for public access</li>
            </ul>`,
        techStack: ['Power BI', 'DAX', 'Power Query', 'FastF1 API', 'Python', 'pandas', 'PySpark'],
        thumbnail: '/projects/thumbnail/f1-analytics.svg',
        longThumbnail: '/projects/long/f1-analytics.svg',
        images: ['/projects/images/f1-analytics-1.svg'],
    },
    {
        title: 'Asset Management Optimization Platform',
        slug: 'amop',
        sourceCode: 'https://github.com/shamanth-g-bharadwaj/Asset-management-optimization-platform',
        year: 2024,
        description: `A full-stack portfolio analytics platform combining inflation modelling, asset ranking, time series forecasting,
            and interactive dashboards to support data-driven investment decisions.<br/><br/>

            AMOP addresses the fragmentation problem in personal finance — bringing financial market data, inflation context,
            and portfolio simulation into one analytical solution.<br/><br/>

            What makes it stand out:<br/>
            <ul>
                <li>Grounded in genuine user research — surveys, empathy maps, personas, and journey analysis shaped every analytical choice</li>
                <li>VAR modelling outperformed traditional ML for financial forecasting — a real-world finding, not a textbook default</li>
                <li>Output is decision-ready, not just technically impressive</li>
            </ul>`,
        role: `Sole Developer & Researcher<br/>
            <ul>
                <li>Conducted user research (surveys, empathy maps, personas) before any code was written</li>
                <li>Built inflation modelling and CAGR analysis pipelines using Python + yfinance API</li>
                <li>Evaluated VAR vs ML forecasting approaches; selected VAR based on empirical performance</li>
                <li>Built interactive Tableau and Power BI dashboards for portfolio simulation</li>
            </ul>`,
        techStack: ['Power BI', 'Tableau', 'Excel', 'yfinance API', 'VAR Forecasting', 'CAGR Analysis', 'Python'],
        thumbnail: '/projects/thumbnail/amop.svg',
        longThumbnail: '/projects/long/amop.svg',
        images: ['/projects/images/amop-1.svg'],
    },
    {
        title: 'Real Estate Buying Decision Prediction',
        slug: 'real-estate-ml',
        sourceCode: 'https://github.com/shamanth-g-bharadwaj/Real-estate-predictive-modelling',
        year: 2024,
        description: `A machine learning classification project predicting whether a property will be purchased, based on housing
            attributes including size, location, pricing, energy rating, and renovation needs.<br/><br/>

            Starting from 13,320 rows of raw real estate data, built a full preprocessing pipeline, engineered 3 new features,
            and compared 4 ML models — with a tuned Random Forest achieving <strong>75.63% accuracy and 0.93 AUC</strong>.<br/><br/>

            What makes it stand out:<br/>
            <ul>
                <li>Professional-grade analytical rigour — IQR-based outlier handling, deliberate feature engineering</li>
                <li>Top predictors revealed buyers are driven by layout efficiency, sustainability credentials, and property readiness — beyond just price</li>
                <li>Findings have real commercial relevance for real estate platforms and agents</li>
            </ul>`,
        role: `Sole Developer & Analyst<br/>
            <ul>
                <li>Built full preprocessing pipeline: missing value imputation, IQR outlier handling, encoding</li>
                <li>Engineered 3 new features that improved model interpretability</li>
                <li>Trained and compared Logistic Regression, Random Forest, KNN, and Decision Tree models</li>
                <li>Performed hyperparameter tuning; achieved 75.63% accuracy and 0.93 AUC with Random Forest</li>
            </ul>`,
        techStack: ['Python', 'pandas', 'scikit-learn', 'Random Forest', 'Logistic Regression', 'KNN', 'matplotlib', 'seaborn'],
        thumbnail: '/projects/thumbnail/real-estate-ml.svg',
        longThumbnail: '/projects/long/real-estate-ml.svg',
        images: ['/projects/images/real-estate-ml-1.svg'],
    },
    {
        title: 'Economic Forecasting & PPP Analysis',
        slug: 'economic-forecasting',
        sourceCode: 'https://github.com/shamanth-g-bharadwaj/Economic-forecasting-ppp-analysis',
        year: 2024,
        description: `A rigorous time series analysis project testing whether Purchasing Power Parity holds between Switzerland and
            Singapore, using 26 years of monthly macroeconomic data.<br/><br/>

            After stationarity testing, OLS-based PPP testing, and Box-Jenkins ARIMA model selection, found that neither absolute
            nor relative PPP holds — and that <strong>ARIMA(0,1,1)</strong> best describes the real exchange rate path.<br/><br/>

            What makes it stand out:<br/>
            <ul>
                <li>Every modelling decision grounded in statistical testing — ADF, Ljung-Box, AIC/BIC comparison</li>
                <li>Demonstrates comfort with economic theory, time series mechanics, and the limits of models</li>
                <li>The finding that PPP does not hold is analytically interesting in itself</li>
            </ul>`,
        role: `Sole Analyst<br/>
            <ul>
                <li>Collected and processed 26 years of monthly macroeconomic data</li>
                <li>Conducted ADF stationarity tests and OLS-based PPP hypothesis testing</li>
                <li>Applied Box-Jenkins methodology for ARIMA model selection (AIC/BIC comparison)</li>
                <li>Validated residuals with Ljung-Box diagnostics; produced forecast with confidence intervals</li>
            </ul>`,
        techStack: ['Python', 'pandas', 'statsmodels', 'ARIMA', 'ADF Testing', 'OLS', 'matplotlib', 'Jupyter Notebook'],
        thumbnail: '/projects/thumbnail/economic-forecasting.svg',
        longThumbnail: '/projects/long/economic-forecasting.svg',
        images: ['/projects/images/economic-forecasting-1.svg'],
    },
    {
        title: 'Foodwill SDG 2 Analytics',
        slug: 'foodwill-analytics',
        sourceCode: 'https://github.com/shamanth-g-bharadwaj/Foodwill_analytics',
        year: 2024,
        description: `A data analytics project built for Foodwill Charitable Organization to monitor progress toward UN Sustainable
            Development Goal 2 (Zero Hunger) across six target countries — Afghanistan, Nepal, Bangladesh, Ukraine, Moldova, and Albania
            — using FAO food security indicators from 2000 to 2023.<br/><br/>

            Transformed raw UN data into cleaned, structured, visualised intelligence to support NGO decision-making and
            humanitarian resource allocation.<br/><br/>

            What makes it stand out:<br/>
            <ul>
                <li>Analytics in service of a real humanitarian mission — findings have genuine stakes</li>
                <li>Context-aware data handling: threshold-coded values, irregular time intervals, geopolitical outliers</li>
                <li>Correlation findings between dietary energy supply and undernourishment provide evidence-based justification for intervention prioritisation</li>
            </ul>`,
        role: `Data Analyst & Dashboard Developer<br/>
            <ul>
                <li>Cleaned and structured FAO food security datasets across 6 countries (2000–2023)</li>
                <li>Handled threshold-coded values, irregular time intervals, and geopolitical data anomalies</li>
                <li>Performed correlation analysis between dietary energy supply and undernourishment/stunting indicators</li>
                <li>Built Power BI dashboard for NGO stakeholders to monitor SDG 2 progress and prioritise interventions</li>
            </ul>`,
        techStack: ['Power BI', 'Excel', 'FAO Dataset', 'SDG Indicators', 'Statistical Analysis', 'Forecasting', 'Python'],
        thumbnail: '/projects/thumbnail/foodwill-analytics.svg',
        longThumbnail: '/projects/long/foodwill-analytics.svg',
        images: ['/projects/images/foodwill-analytics-1.svg'],
    },
];
