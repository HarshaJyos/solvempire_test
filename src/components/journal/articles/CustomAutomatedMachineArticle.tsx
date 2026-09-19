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

export const tocCustomMachine = [
  { id: "start-with-process", text: "1. Start With the Process, Not the Machine" },
  { id: "define-success-metrics", text: "2. Define What Success Looks Like" },
  { id: "understand-part-variability", text: "3. Understand Product & Part Variability" },
  { id: "develop-automation-concept", text: "4. Develop the Automation Concept" },
  { id: "prove-difficult-parts-poc", text: "5. Prove Difficult Parts Before Building (POC)" },
  { id: "design-mechanical-system", text: "6. Design the Mechanical System" },
  { id: "electrical-controls-architecture", text: "7. Design Electrical & Controls Architecture" },
  { id: "motion-control-robotics", text: "8. Motion Control & Robotics" },
  { id: "machine-vision-inspection", text: "9. Machine Vision & Automated Inspection" },
  { id: "machine-safety-standards", text: "10. Design Machine Safety From Day One" },
  { id: "fabrication-physical-build", text: "11. Physical Fabrication & Build" },
  { id: "system-integration", text: "12. Multi-Disciplinary System Integration" },
  { id: "testing-with-real-parts", text: "13. Rigorous Testing With Real Parts" },
  { id: "fat-testing", text: "14. Factory Acceptance Testing (FAT)" },
  { id: "installation-commissioning", text: "15. Installation & Commissioning" },
  { id: "ramp-up-production", text: "16. Ramp Up to Production" },
  { id: "document-everything", text: "17. Comprehensive Documentation" },
  { id: "support-maintenance", text: "18. Support, Maintenance & Improvements" },
  { id: "project-timeline-cost", text: "Project Timeline, Costs & ROI" },
  { id: "common-automation-mistakes", text: "Common Custom Automation Mistakes" },
  { id: "simple-process-summary", text: "The 10-Step Automation Process" },
  { id: "faq", text: "Frequently Asked Questions" },
];

const faqs: FaqItem[] = [
  {
    question: "When should a company build a custom machine instead of buying off-the-shelf equipment?",
    answer:
      "Custom automation is recommended when standard catalog machinery cannot accommodate your specific part geometry, tight cycle time constraints, unique tolerances, multi-step integration requirements, or proprietary manufacturing processes that create a competitive advantage.",
  },
  {
    question: "What is the typical timeline for building a custom automated machine?",
    answer:
      "A relatively simple automated fixture takes 2–3 months, while complex multi-axis robotic production cells with machine vision and safety integration typically require 4–8 months across Discovery, POC, Detailed Engineering, Fabrication, Integration, FAT, and Commissioning.",
  },
  {
    question: "Why is a Proof of Concept (POC) essential in automation?",
    answer:
      "A POC isolates the riskiest, most uncertain element of the process (such as robotic part feeding, high-speed vision inspection, or delicate micro-assembly) before designing the surrounding machine frame and controls—saving months of rework.",
  },
  {
    question: "What happens during a Factory Acceptance Test (FAT)?",
    answer:
      "The machine is run at full production speed in the builder's facility using real production batches. Cycle times, dimensional tolerances, defect detection, safety interlocks, alarms, and changeover routines are formally signed off before shipping.",
  },
  {
    question: "How do you calculate the ROI of custom automation?",
    answer:
      "ROI is measured through throughput increase, scrap/defect reduction, elimination of production bottlenecks, operator safety improvements, and recurring labor reallocation, evaluated against initial capital expenditure and ongoing maintenance.",
  },
];

export function CustomAutomatedMachineArticle({ post }: { post: JournalPostMeta }) {
  return (
    <>
      <P lead>
        Someone usually asks for a custom automated machine in a deceptively simple way: <Span variant="bold">“We need to automate this process.”</Span>
      </P>

      <P>
        It sounds reasonable. Maybe an operator is loading parts by hand. Maybe a repetitive assembly step is limiting production. Maybe the process is too dangerous, too slow, or simply too boring to keep asking humans to do eight hours a day.
      </P>

      <P>
        So the natural thought is: <Span variant="italic">“Let&apos;s build a machine.”</Span>
      </P>

      <P>
        Unfortunately, the machine is not the first thing you need to build. The first thing you need to build is an understanding of what the machine actually needs to accomplish.
      </P>

      <JournalCallout variant="science" title="The Complete Automation Roadmap">
        <Span variant="bold">Requirements → Concept → Proof of Concept (POC) → Detailed Engineering → Fabrication → Integration → Testing → Installation → Commissioning → Production</Span>
      </JournalCallout>

      <H2 id="start-with-process">1. Start With the Process, Not the Machine</H2>

      <P>
        Before opening a CAD program, the engineering team needs to understand the process. What is the product? What happens before and after the station? Are you trying to increase throughput, improve consistency, reduce scrap, or eliminate ergonomic hazards?
      </P>

      <H2 id="define-success-metrics">2. Define What Success Looks Like</H2>

      <P>
        <Span variant="italic">“Make it faster”</Span> is not an engineering specification. You need hard numbers: cycle time (e.g. 12 seconds per unit), required hourly throughput, acceptable defect rate (&lt;0.1%), dimensional tolerances (&plusmn;0.05 mm), changeover duration, floor space constraints, and utility requirements (power, compressed air, network).
      </P>

      <H2 id="understand-part-variability">3. Understand Product &amp; Part Variability</H2>

      <P>
        A machine doesn&apos;t work with an idealized CAD file—it works with real raw parts. Real parts have tolerances, surface oil, temperature variations, burrs, and inconsistent bin orientations. Understanding variability is vital for robotic feeding, gripping, and vision inspection.
      </P>

      <H2 id="develop-automation-concept">4. Develop the Automation Concept</H2>

      <P>
        Engineers evaluate kinematic options: linear servo actuators, pneumatic indexers, rotary dials, Cartesian gantries, or articulated 6-axis robotic arms. The best machine is not the one with the most complex mechanisms—it is the one that solves the problem reliably with minimal maintenance overhead.
      </P>

      <H2 id="prove-difficult-parts-poc">5. Prove Difficult Parts Before Building (POC)</H2>

      <P>
        If one step is uncertain—such as optical defect detection under varying ambient light or gripping an oily silicone gasket—test it with a dedicated benchtop prototype first.
      </P>

      <JournalCallout variant="tip" title="Core Rule of Automation Risk">
        Test the uncertainty before you spend money building around it.
      </JournalCallout>

      <H2 id="design-mechanical-system">6. Design the Mechanical System</H2>

      <P>
        Mechanical engineers model machine frames, precision tooling, custom end-effectors, conveyors, and guarding in 3D CAD. FEA (Finite Element Analysis) verifies structural rigidity, while ergonomic clearances ensure maintenance technicians can easily access wear components.
      </P>

      <H2 id="electrical-controls-architecture">7. Design Electrical &amp; Controls Architecture</H2>

      <P>
        The controls system coordinates PLCs (Programmable Logic Controllers), servo drives, sensors, safety relays, HMIs (Human-Machine Interfaces), and industrial Ethernet networks (EtherCAT, Profinet, Ethernet/IP).
      </P>

      {/* Process Table */}
      <Table caption="Table 1: Automation Engineering Disciplines &amp; Deliverables">
        <THead>
          <TR>
            <TH>Engineering Layer</TH>
            <TH>Hardware &amp; Technology</TH>
            <TH>Core Objective</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD variant="bold">Mechanical</TD>
            <TD>Frames, actuators, pneumatic grippers, fixtures</TD>
            <TD variant="mint">Structural stability, precision &amp; ergonomics</TD>
          </TR>
          <TR>
            <TD variant="bold">Controls &amp; PLC</TD>
            <TD>PLCs, safety controllers, I/O modules, HMIs</TD>
            <TD variant="mint">Deterministic logic, state machines &amp; alarms</TD>
          </TR>
          <TR>
            <TD variant="bold">Motion &amp; Robotics</TD>
            <TD>Servos, linear encoders, 6-axis robot arms</TD>
            <TD variant="mint">Repeatable, high-speed part positioning</TD>
          </TR>
          <TR>
            <TD variant="bold">Machine Vision</TD>
            <TD>Industrial cameras, telecentric optics, AI vision</TD>
            <TD variant="mint">100% automated quality inspection &amp; guidance</TD>
          </TR>
          <TR>
            <TD variant="bold">Safety Engineering</TD>
            <TD>Light curtains, interlocks, e-stops, safety scanners</TD>
            <TD variant="mint">Zero operator hazard compliance (ISO 13849/CE)</TD>
          </TR>
        </TBody>
      </Table>

      <H2 id="motion-control-robotics">8. Motion Control &amp; Robotics</H2>

      <P>
        Choose robots and motion stages based on payload, reach, speed, path repeatability, and factory environment. Use collaborative robots (cobots) where space is tight and humans work side-by-side; use industrial SCARA or 6-axis arms for high-speed cycle times.
      </P>

      <H2 id="machine-vision-inspection">9. Machine Vision &amp; Automated Inspection</H2>

      <P>
        Integrated cameras verify part presence, check orientation, perform dimensional metrology, and read 2D DataMatrix barcodes. Consistent lighting (backlights, ring lights, coaxial illumination) is 80% of vision success.
      </P>

      <H2 id="machine-safety-standards">10. Design Machine Safety From Day One</H2>

      <P>
        Safety is never an afterthought. Integrate interlocked door switches, safety scanners, light curtains, emergency stops, and safe torque off (STO) in compliance with ISO 13849-1 (PLd/PLe) and ANSI/RIA standards.
      </P>

      <H2 id="fabrication-physical-build">11. Physical Fabrication &amp; Build</H2>

      <P>
        Machined components (CNC milling, turning), welded steel tubular frames, precision ground plates, and wired electrical cabinets come together in the assembly bay.
      </P>

      <H2 id="system-integration">12. Multi-Disciplinary System Integration</H2>

      <P>
        Mechanical, electrical, controls, and software merge into a single machine. Debugging sequencing, sensor timing, and robot handshakes is where true engineering excellence is proven.
      </P>

      <H2 id="testing-with-real-parts">13. Rigorous Testing With Real Parts</H2>

      <P>
        Test the machine with actual production parts—including worst-case tolerance batches—to ensure the feeder never jams and the vision system doesn&apos;t produce false rejects.
      </P>

      <H2 id="fat-testing">14. Factory Acceptance Testing (FAT)</H2>

      <P>
        The customer visits the builder&apos;s facility to witness continuous test runs, verify cycle times, inspect safety interlocks, and sign off the FAT document before shipping.
      </P>

      <H2 id="installation-commissioning">15. Installation &amp; Commissioning</H2>

      <P>
        On-site anchoring, leveling, utility connection, calibration, and dry runs ensure the machine adapts to real plant electrical power, air pressure, and ambient conditions.
      </P>

      <H2 id="ramp-up-production">16. Ramp Up to Production</H2>

      <P>
        Gradually increase production volumes while training plant operators and maintenance engineers to troubleshoot alarms, perform routine lubrication, and execute changeovers independently.
      </P>

      <H2 id="document-everything">17. Comprehensive Documentation</H2>

      <P>
        Deliver full CAD assembly drawings, electrical schematics (EPLAN), pneumatic diagrams, PLC code backups, spare parts BOMs, and maintenance SOPs.
      </P>

      <H2 id="support-maintenance">18. Support, Maintenance &amp; Improvements</H2>

      <P>
        Establish remote diagnostic access, scheduled PM (Preventative Maintenance) checklists, and modular tooling upgrades as product lines evolve.
      </P>

      <H2 id="project-timeline-cost">Project Timeline, Costs &amp; ROI</H2>

      <P>
        Evaluate custom automation not simply on purchase price, but on total financial impact: scrap reduction, bottleneck removal, operator safety, and payback period (typically 12–24 months).
      </P>

      <H2 id="common-automation-mistakes">Common Custom Automation Mistakes</H2>

      <JournalOL>
        <LI><Span variant="bold">Starting with a technology pitch</Span> (&quot;We want a robot&quot;) instead of the process problem.</LI>
        <LI><Span variant="bold">Skipping the proof of concept</Span> on high-risk mechanisms.</LI>
        <LI><Span variant="bold">Designing mechanical and electrical systems in silos.</Span></LI>
        <LI><Span variant="bold">Ignoring maintenance access</Span> and component serviceability.</LI>
        <LI><Span variant="bold">Changing process specifications late</Span> during fabrication.</LI>
      </JournalOL>

      <H2 id="simple-process-summary">The 10-Step Automation Process</H2>

      <JournalOL>
        <LI><Span variant="bold">Understand the process</Span> and current manual bottlenecks.</LI>
        <LI><Span variant="bold">Define measurable numbers</Span> (cycle time, throughput, Cpk).</LI>
        <LI><Span variant="bold">Develop kinematic concepts</Span> (rotary, linear, robotic).</LI>
        <LI><Span variant="bold">Prove uncertain steps with a POC.</Span></LI>
        <LI><Span variant="bold">Engineer mechanical, electrical, and control systems.</Span></LI>
        <LI><Span variant="bold">Fabricate and assemble in a controlled bay.</Span></LI>
        <LI><Span variant="bold">Perform rigorous integration testing with real parts.</Span></LI>
        <LI><Span variant="bold">Conduct formal Factory Acceptance Testing (FAT).</Span></LI>
        <LI><Span variant="bold">Install, calibrate, and commission on-site.</Span></LI>
        <LI><Span variant="bold">Train operators and document everything.</Span></LI>
      </JournalOL>

      <JournalDivider />

      <JournalTakeaways
        title="Summary & Key Takeaways"
        points={[
          "Building a custom machine is really about engineering a robust production capability.",
          "Always validate risky feeding, gripping, or vision operations with an early Proof of Concept.",
          "Design safety, maintenance access, and modularity into the mechanical and controls architecture from day one.",
          "The best machine is the one that runs reliably, safely, and repeatedly without requiring an engineer to stand beside it.",
        ]}
      />

      <JournalFaq
        items={faqs}
        title="Frequently Asked Questions"
        description="Practical insights on custom automation engineering, machine vision, robotics, FAT, and commissioning."
      />

      <JournalRelated
        currentSlug={post.slug}
        category={post.category}
      />
    </>
  );
}
