"use client";

import React from "react";
import {
  P,
  Span,
  H2,
  JournalUL,
  JournalOL,
  LI,
  JournalCallout,
  JournalQuote,
  JournalTakeaways,
  JournalDivider,
  JournalFaq,
  JournalRelated,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
} from "@/components/journal/JournalComponents";
import { JournalPostMeta } from "@/types/journal";
import { FaqItem } from "@/components/journal/JournalFaq";

export const tocWhatIsEndToEnd = [
  { id: "what-is-end-to-end", text: "What Exactly Is End-to-End Product Engineering?" },
  { id: "first-step-isnt-coding", text: "The First Step Isn't Coding" },
  { id: "prototype-before-building", text: "Prototype Before You Build" },
  { id: "design-beyond-looks", text: "Design Isn't Just Making Things Look Nice" },
  { id: "architecture-sensible", text: "Architecture: Don't Build NASA When You Need a Bicycle" },
  { id: "building-incrementally", text: "Then We Actually Build the Thing" },
  { id: "qa-engineering", text: "QA: Because Your Customers Are Not Your Testing Team" },
  { id: "devops-reliability", text: "DevOps: “It Works on My Machine” Is Not a Deployment Strategy" },
  { id: "production-reality", text: "Production Is Where the Product Becomes Real" },
  { id: "continuous-lifecycle", text: "The Product Isn't Finished When You Launch It" },
  { id: "connected-loop", text: "So What Makes It End-to-End?" },
  { id: "practical-benefits", text: "Why Does End-to-End Product Engineering Matter?" },
  { id: "implementation-principles", text: "How Do You Actually Implement It?" },
  { id: "the-mindset-shift", text: "From Software Development to Product Engineering" },
  { id: "faq", text: "Frequently Asked Questions" },
];

const faqs: FaqItem[] = [
  {
    question: "What is end-to-end product engineering?",
    answer:
      "End-to-end product engineering is an approach to building software that covers the complete product lifecycle—from discovery, validation, design, and architecture through development, testing, deployment, monitoring, and continuous improvement.",
  },
  {
    question: "How is product engineering different from software development?",
    answer:
      "Software development primarily focuses on building code to meet specifications. Product engineering takes a broader view, combining product strategy, UX, architecture, development, quality engineering, DevOps, operations, and customer feedback loops to build and continuously improve a viable product.",
  },
  {
    question: "Does end-to-end product engineering mean building everything from scratch?",
    answer:
      "No. Good engineering is not about reinventing every component. Teams should build proprietary capabilities that create competitive advantage and integrate proven third-party platforms for commodity functionality (like payments, authentication, and cloud infrastructure) when appropriate.",
  },
  {
    question: "When should DevOps become part of a product?",
    answer:
      "As early as practical. You don't need a giant DevOps organization on day one, but deployment automation, environments, security, monitoring, and CI/CD pipelines should be considered from early development rather than becoming a launch-week emergency.",
  },
  {
    question: "Is end-to-end product engineering only for large enterprises?",
    answer:
      "No. In many ways, startups benefit most because early validation, rapid feedback loops, automation, and sensible architecture prevent them from spending months building the wrong thing.",
  },
  {
    question: "What is the biggest benefit of end-to-end product engineering?",
    answer:
      "Faster learning. It helps teams move more quickly from an assumption to a working product, real customer feedback, and an informed decision about what to do next. That is usually much more valuable than simply writing more code.",
  },
];

export function EndToEndProductEngineeringArticle({ post }: { post: JournalPostMeta }) {
  return (
    <>
      <P lead>
        Someone has an idea. It sounds simple: <Span variant="bold">“We just need an app where users can do X.”</Span>
      </P>

      <P>
        That sentence has probably destroyed more engineering budgets than almost anything else in technology.
      </P>

      <P>
        Because “just an app” usually becomes authentication, payments, notifications, an admin dashboard, analytics, integrations, permissions, security, mobile responsiveness, an API, a database, cloud infrastructure, monitoring, and—my personal favorite—a requirement discovered three weeks before launch that apparently everyone assumed was obvious.
      </P>

      <P>
        And then someone asks: <Span variant="italic">“Why is this taking so long?”</Span>
      </P>

      <P>Welcome to software.</P>

      <P>
        The truth is, building a software product has very little to do with simply writing code. Code is important, obviously. It is difficult, it requires skill, and occasionally it even works exactly as expected.
      </P>

      <P>
        But successful products require much more than that. You need to understand the problem before solving it. You need to know who you&apos;re solving it for. You need to design something people can actually use. You need an architecture that doesn&apos;t collapse the moment your first marketing campaign works. You need quality engineering, deployment automation, monitoring, security, and a feedback loop that tells you whether you&apos;ve built something useful or simply spent six months building something nobody asked for.
      </P>

      <JournalCallout variant="insight" title="The Core Thesis">
        Product engineering isn&apos;t a collection of disconnected activities. It is one continuous journey—from figuring out what to build to figuring out why nobody is using the thing you built, and then improving it.
      </JournalCallout>

      <H2 id="what-is-end-to-end">So, What Exactly Is End-to-End Product Engineering?</H2>

      <P>
        At its simplest, end-to-end product engineering is the process of taking a product from idea to production and continuously improving it after launch.
      </P>

      <P>That includes:</P>

      <JournalUL>
        <LI><Span variant="bold">Product discovery and ideation</Span></LI>
        <LI><Span variant="bold">Market and user validation</Span></LI>
        <LI><Span variant="bold">UX and UI design</Span></LI>
        <LI><Span variant="bold">Prototyping &amp; interactive flows</Span></LI>
        <LI><Span variant="bold">Architecture and technology selection</Span></LI>
        <LI><Span variant="bold">Software development</Span></LI>
        <LI><Span variant="bold">Quality engineering and testing</Span></LI>
        <LI><Span variant="bold">DevOps and deployment automation</Span></LI>
        <LI><Span variant="bold">Security and performance</Span></LI>
        <LI><Span variant="bold">Monitoring and observability</Span></LI>
        <LI><Span variant="bold">Customer feedback loops</Span></LI>
        <LI><Span variant="bold">Continuous improvement</Span></LI>
      </JournalUL>

      <P>
        The important part isn&apos;t the list. The important part is <Span variant="highlight">how these pieces work together.</Span>
      </P>

      <P>
        Traditional software projects often treat these activities like separate departments in an office building. Product creates requirements. Design creates screens. Engineering builds them. QA finds problems. DevOps deploys the application. Product checks the analytics. Then everyone gets together three months later to discuss why the product isn&apos;t doing what anyone expected.
      </P>

      <JournalQuote author="Hanish Jyosyabhatla">
        A perfectly coded product that solves the wrong problem is still a perfectly coded failure.
      </JournalQuote>

      <H2 id="first-step-isnt-coding">The First Step Isn&apos;t Coding</H2>

      <P>
        This is probably the hardest thing to explain to someone who has just had a great product idea. Your first job isn&apos;t to build it. Your first job is to figure out whether it deserves to be built.
      </P>

      <P>
        I know. Less exciting. You have the idea. You&apos;re already imagining the logo, the app store screenshots, the Series A announcement, and probably the acquisition by Google. Meanwhile, the actual customer is still using Excel.
      </P>

      <P>Before engineering starts, teams need to understand:</P>

      <JournalUL>
        <LI>What problem are we solving?</LI>
        <LI>Who actually has this problem?</LI>
        <LI>How are they solving it today?</LI>
        <LI>Is the problem painful enough for them to change?</LI>
        <LI>What alternatives already exist?</LI>
        <LI>What makes our solution different?</LI>
        <LI>What is the smallest version we can build to validate the idea?</LI>
      </JournalUL>

      <H2 id="prototype-before-building">Prototype Before You Build</H2>

      <P>
        A prototype is one of the cheapest ways to discover that your brilliant idea has a slightly less brilliant user flow.
      </P>

      <P>
        You can put a clickable prototype in front of users and watch what happens. Sometimes they immediately understand it. Sometimes they don&apos;t. Sometimes they click a button you never intended them to click because, apparently, users have the audacity to behave like users.
      </P>

      <P>
        That&apos;s exactly what you want to discover early. A prototype allows teams to validate workflows, assumptions, navigation, and user experience before turning every mistake into production code.
      </P>

      <JournalCallout variant="tip" title="Core Rule of Validation">
        Fail cheaply before you fail expensively.
      </JournalCallout>

      <H2 id="design-beyond-looks">Design Isn&apos;t Just Making Things Look Nice</H2>

      <P>
        There is still a strange habit in software where design is treated as something that happens before “the real work” begins. It shouldn&apos;t.
      </P>

      <P>
        Good product design is about understanding how people interact with the system and making that interaction as simple as possible.
      </P>

      <P>
        And here&apos;s something I&apos;ve learned after watching plenty of products get built: <Span variant="bold">A beautiful Figma file is not a product. Neither is a beautiful codebase.</Span> One is something users can&apos;t use, and the other is something users can&apos;t see. You need both to work.
      </P>

      <H2 id="architecture-sensible">Architecture: Don&apos;t Build NASA When You Need a Bicycle</H2>

      <P>
        Once the problem and experience are reasonably understood, engineering decisions start becoming important. What technology should we use? What belongs in the backend? Which database makes sense? Do we need microservices?
      </P>

      <P>
        Teams sometimes over-engineer products because sophisticated architecture feels reassuring. You start with five users and somehow end up with Kubernetes, twelve microservices, event-driven architecture, three databases, and a platform engineering team.
      </P>

      <P>
        Congratulations. You have successfully scaled something that doesn&apos;t have users yet.
      </P>

      <JournalCallout variant="science" title="Pragmatic Architecture">
        Good engineering is largely about knowing what not to build yet. Make sensible technical decisions for the product&apos;s current needs while leaving enough room for its future.
      </JournalCallout>

      <H2 id="building-incrementally">Then We Actually Build the Thing</H2>

      <P>
        Eventually, somebody has to write the code. But modern product engineering isn&apos;t about disappearing into a development cave for six months and returning with a giant application.
      </P>

      <P>
        Teams should build incrementally: small releases, frequent feedback, code reviews, automated builds, continuous integration, feature flags, and constant communication between product, design, engineering, and QA.
      </P>

      <P>
        There is also technical debt. Technical debt isn&apos;t automatically bad—sometimes moving quickly is the right decision. The problem is pretending it doesn&apos;t exist. Good product engineering continuously balances feature delivery with refactoring, reliability, security, and maintainability.
      </P>

      {/* Comparison Table */}
      <Table caption="Table 1: Traditional Software Development vs. Connected End-to-End Product Engineering">
        <THead>
          <TR>
            <TH>Dimension</TH>
            <TH>Traditional Software Dev</TH>
            <TH>End-to-End Product Engineering</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD variant="bold">Primary Focus</TD>
            <TD>Feature implementation &amp; tickets</TD>
            <TD variant="mint">Customer &amp; business outcomes</TD>
          </TR>
          <TR>
            <TD variant="bold">Requirements</TD>
            <TD>Fixed specs passed over wall</TD>
            <TD variant="mint">Validated collaboratively before coding</TD>
          </TR>
          <TR>
            <TD variant="bold">Quality &amp; Testing</TD>
            <TD>Final inspection step before launch</TD>
            <TD variant="mint">Engineered throughout the entire lifecycle</TD>
          </TR>
          <TR>
            <TD variant="bold">Infrastructure</TD>
            <TD>Handed over to DevOps late</TD>
            <TD variant="mint">Automated CI/CD &amp; observability from day one</TD>
          </TR>
          <TR>
            <TD variant="bold">Post-Launch</TD>
            <TD>Project marked &quot;done&quot; and disbanded</TD>
            <TD variant="mint">Continuous observation, feedback &amp; refinement</TD>
          </TR>
        </TBody>
      </Table>

      <H2 id="qa-engineering">QA: Because Your Customers Are Not Your Testing Team</H2>

      <P>
        There is a surprisingly popular testing strategy in software: <Span variant="italic">Ship it and see what happens.</Span> It&apos;s fast. It&apos;s cheap. And it is extremely effective at identifying which customers are willing to send angry emails.
      </P>

      <P>
        We can do better. Quality engineering needs to happen throughout the development lifecycle, combining unit testing, integration tests, UI tests, security checks, and exploratory testing where real human curiosity finds edge cases.
      </P>

      <H2 id="devops-reliability">DevOps: “It Works on My Machine” Is Not a Deployment Strategy</H2>

      <P>
        Anyone can deploy once. The challenge is deploying repeatedly without turning every release into a company-wide emergency.
      </P>

      <P>
        Good DevOps practices automate builds, standardize environments, detect failures quickly, roll back safely, and scale infrastructure when real traffic arrives.
      </P>

      <H2 id="production-reality">Production Is Where the Product Becomes Real</H2>

      <P>
        Launch day feels like the finish line. It isn&apos;t. It&apos;s the first time your software gets to meet people who weren&apos;t involved in building it.
      </P>

      <P>
        Observability is essential because production systems rarely fail in a way that politely explains what went wrong. You need logs, metrics, traces, alerts, and analytics to understand what is really happening.
      </P>

      <H2 id="continuous-lifecycle">The Product Isn&apos;t Finished When You Launch It</H2>

      <P>
        Software is never really “done.” You launch. You learn. You improve. You refactor. You release again.
      </P>

      <JournalCallout variant="science" title="The Continuous Engineering Loop">
        <Span variant="bold">Discover → Design → Build → Test → Release → Observe → Learn → Improve</Span>
      </JournalCallout>

      <H2 id="connected-loop">So What Makes It End-to-End?</H2>

      <P>
        The real advantage is <Span variant="bold">continuity</Span>. Instead of a disjointed chain where information disappears at every handoff, you create a connected engineering loop where the problem, the design, the architecture, the code, and the customer data inform each other constantly.
      </P>

      <H2 id="practical-benefits">Why Does End-to-End Product Engineering Matter?</H2>

      <JournalOL>
        <LI><Span variant="bold">Faster time to value:</Span> Fewer handoffs, misunderstandings, and unnecessary approval cycles.</LI>
        <LI><Span variant="bold">Less rework:</Span> Finding a bad assumption during prototyping costs pennies compared to rewriting after six months of development.</LI>
        <LI><Span variant="bold">Better product quality:</Span> Quality and security are built-in from the ground up.</LI>
        <LI><Span variant="bold">Better scalability:</Span> Sensible architectures that reflect real growth trajectories.</LI>
        <LI><Span variant="bold">Faster learning:</Span> Learning that you&apos;re wrong quickly is more valuable than being confidently wrong for twelve months.</LI>
      </JournalOL>

      <H2 id="implementation-principles">How Do You Actually Implement It?</H2>

      <JournalOL>
        <LI><Span variant="bold">Create one shared product vision</Span> across product, engineering, and design.</LI>
        <LI><Span variant="bold">Build cross-functional teams</Span> that can solve problems together in an afternoon.</LI>
        <LI><Span variant="bold">Validate before scaling</Span> with lightweight prototypes and customer interviews.</LI>
        <LI><Span variant="bold">Automate repetitive work</Span> with CI/CD and automated test suites.</LI>
        <LI><Span variant="bold">Measure outcomes, not activity.</Span> Shipping 200 tickets doesn&apos;t matter if customers still hate the product.</LI>
        <LI><Span variant="bold">Treat production as part of engineering</Span> through continuous monitoring and observability.</LI>
      </JournalOL>

      <H2 id="the-mindset-shift">From Software Development to Product Engineering</H2>

      <P>
        Software development traditionally asks: <Span variant="italic">“Can we build this?”</Span>
      </P>

      <P>
        Product engineering asks a slightly more uncomfortable set of questions:
      </P>

      <JournalUL>
        <LI><Span variant="bold">“Should we build this?”</Span></LI>
        <LI><Span variant="bold">“Who is it for?”</Span></LI>
        <LI><Span variant="bold">“What is the simplest useful version?”</Span></LI>
        <LI><Span variant="bold">“Can we build it reliably?”</Span></LI>
        <LI><Span variant="bold">“Will it scale?”</Span></LI>
        <LI><Span variant="bold">“Now that we&apos;ve launched it, what did we learn?”</Span></LI>
      </JournalUL>

      <JournalDivider />

      <JournalTakeaways
        title="Summary & Takeaways"
        points={[
          "Product engineering connects discovery, design, development, DevOps, and post-launch analytics into one continuous feedback loop.",
          "Prototypes and customer interviews save hundreds of thousands of dollars by invalidating flawed assumptions before expensive code is written.",
          "Architecture should solve today's real requirements with sensible room for tomorrow—not scale zero users to hypothetical millions.",
          "Launch day is the start of learning, not the end of the project.",
        ]}
      />

      <JournalFaq
        items={faqs}
        title="Frequently Asked Questions"
        description="Core questions on end-to-end product engineering, team structures, and operational strategies."
      />

      <JournalRelated
        currentSlug={post.slug}
        category={post.category}
      />
    </>
  );
}
