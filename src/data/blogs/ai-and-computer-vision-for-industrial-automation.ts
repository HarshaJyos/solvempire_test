import { BlogArticleData } from "@/types/blog-article";

export const aiAndComputerVisionForIndustrialAutomationBlog: BlogArticleData = {
  meta: {
    id: "post-022",
    slug: "ai-and-computer-vision-for-industrial-automation",
    title: "AI + Computer Vision for Industrial Automation",
    subtitle:
      "Edge-AI Architectures, TensorRT Quantization, Global Shutter Optics, and Sub-50ms Defect Classification on Physical Assembly Lines.",
    excerpt:
      "A senior AI engineer's guide to deploying computer vision and edge-AI models on automated industrial machines. Explore global shutter camera physics, telecentric optics, TensorRT INT8 quantization, embedded NPU hardware (Jetson Orin vs NXP i.MX8), microsecond strobe synchronization, and real-time pneumatic reject actuation.",
    category: "Custom Automation",
    type: "Technical Guide",
    author: {
      name: "Prasad Duggirala",
      role: "AI/ML Engineer",
      avatar: "/avatars/prasad.png",
      bio: "AI/ML Engineer at SolveMpire. Developing intelligent edge-AI models, computer vision pipelines, telemetry analytics, and predictive maintenance algorithms.",
      slug: "prasad-duggirala",
    },
    coAuthors: [
      {
        name: "Hanish Jyosyabhatla",
        role: "Founder & CEO",
        avatar: "/hanish.webp",
        bio: "Founder & CEO at SolveMpire. Driving end-to-end hardware, embedded systems, custom automation, and product engineering from concept to scaled production.",
        slug: "hanish-jyosyabhatla",
      },
      {
        name: "Gayathri Boyapati",
        role: "Electronics Engineer, PCB & VLSI Specialist",
        avatar: "/avatars/gayatri.jpeg",
        bio: "Electronics Engineer & PCB/VLSI Design Specialist at SolveMpire. Leading custom electronics design, high-speed PCB layouts, power electronics, and embedded hardware integration.",
        slug: "gayathri-boyapati",
      },
    ],
    publishedAt: "Aug 12, 2026",
    isoDate: "2026-08-12T00:00:00Z",
    readTime: "14 min read",
    tags: [
      "Computer Vision",
      "Edge AI",
      "Industrial Automation",
      "TensorRT",
      "Jetson Orin",
      "Global Shutter",
      "Quality Inspection",
      "Embedded Linux",
      "Neural Networks",
      "Custom Automation",
    ],
    featured: false,
  },
  takeaways: [
    "Industrial visual inspection mandates edge compute with zero cloud dependency: processing image frames locally on dedicated NPUs (NVIDIA Jetson Orin Nano, NXP i.MX8M Plus) guarantees deterministic sub-50ms inference latencies on high-speed conveyor lines (60–180 parts/min) with 100% offline uptime.",
    "Global shutter CMOS sensors are essential for moving parts: unlike rolling shutter cameras that produce severe horizontal pixel skew on moving parts, global shutter sensors expose all pixels simultaneously, capturing motion-blur-free frames under microsecond LED strobe pulses.",
    "Telecentric lens physics eliminates perspective error: standard lenses suffer from magnification variation when part heights fluctuate, causing false dimensional rejections. Telecentric optics maintain constant magnification regardless of object distance, providing sub-pixel measurement accuracy (± 0.02 mm).",
    "TensorRT INT8 post-training quantization achieves 4x inference throughput: quantizing FP32 convolutional neural networks (YOLOv8-nano / MobileNetV4) down to 8-bit integers reduces NPU memory bandwidth and drops inference times from 85 ms to 12 ms with under 0.8% accuracy degradation.",
    "Hardware-level strobe and reject timing: synchronizing optical encoder quadrature pulses, high-intensity LED driver strobes (10 µs pulse width), and pneumatic air blow-off solenoid valves via microcontroller hardware timer interrupts ensures zero reject misalignment.",
    "Real-world application: SolveMpire integrated multi-camera edge vision pipelines for automated egg grading, defect detection, and parcel dimensioning across commercial automated machinery fleets.",
  ],
  tableOfContents: [
    { id: "the-edge-vision-imperative", title: "1. The Edge Vision Imperative: Why Cloud AI Fails in Industrial Automation" },
    { id: "optical-physics-and-sensor-selection", title: "2. Industrial Optical Physics: Global Shutter CMOS & Telecentric Lenses" },
    { id: "lighting-geometry-and-strobe-synchronization", title: "3. Lighting Geometry: Darkfield, Brightfield & Microsecond Strobe Drivers" },
    { id: "embedded-ai-hardware-architectures", title: "4. Embedded AI Compute: Jetson Orin Nano vs NXP i.MX8M Plus vs Hailo-8" },
    { id: "deep-learning-models-and-tensorrt-quantization", title: "5. Real-Time Deep Learning: YOLOv8-nano, MobileNetV4 & TensorRT INT8" },
    { id: "deterministic-plc-and-reject-integration", title: "6. Deterministic I/O Integration: Optoisolated Triggers & Pneumatic Reject Kickers" },
    { id: "anomaly-detection-and-synthetic-augmentation", title: "7. Defect Anomaly Detection: PatchCore, Autoencoders & Synthetic Augmentation" },
    { id: "case-study-automated-inspection-machines", title: "8. Production Case Study: 120 Parts/Min Real-Time Sorting Architecture" },
    { id: "edge-vision-engineering-checklist", title: "9. The 10-Point Industrial Edge-AI Engineering Checklist" },
  ],
  sections: [
    {
      type: "lead",
      text: "Human visual inspection in modern industrial manufacturing is fundamentally flawed. Fatigue, shifting ambient factory lighting, and subjective human judgment lead to error rates between 15% and 30% on high-speed production lines. Yet, attempting to solve this by streaming video feeds to cloud AI APIs introduces uncontrollable latency, bandwidth bottlenecks, and total line shutdowns whenever internet connectivity drops.",
    },
    {
      type: "paragraph",
      text: "Industrial computer vision requires a deeply integrated electromechanical approach. It combines precision optical physics, global shutter sensors, structured illumination, optimized deep neural networks running on edge NPUs, and microsecond-synchronized deterministic I/O to inspect, classify, and reject defective components in under 50 milliseconds.",
    },
    {
      type: "paragraph",
      text: "In this engineering guide, SolveMpire details the exact architectural layers, optical calculations, deep learning optimization workflows, and hardware integration schemes required to deploy robust edge-AI computer vision on commercial automated machinery.",
    },
    {
      type: "heading",
      level: 2,
      id: "the-edge-vision-imperative",
      text: "1. The Edge Vision Imperative: Why Cloud AI Fails in Industrial Automation",
    },
    {
      type: "paragraph",
      text: "Commercial automated machinery operating at 60 to 180 cycles per minute cannot tolerate non-deterministic cloud round-trip latencies. Comparing edge vision architectures against cloud-hosted models highlights why on-premise edge compute is the only viable industrial solution:",
    },
    {
      type: "table",
      data: {
        caption: "Architectural Comparison: Cloud-Hosted AI vs. Embedded Edge-AI Vision",
        headers: ["System Parameter", "Cloud-Hosted Vision (AWS / GCP)", "Embedded Edge-AI (SolveMpire Architecture)"],
        rows: [
          ["Total Latency (Frame to Decision)", "250 ms – 1,500 ms (Jitter-prone, variable)", "8 ms – 35 ms (Deterministic, hardware-timed)"],
          ["Internet Dependency", "100% reliant; machine halts if connection drops", "0% reliant; runs 100% offline in isolated factory LAN"],
          ["Cellular / Bandwidth Costs", "Huge data overhead (streaming 1080p @ 30 FPS = 500 GB/month)", "Zero video bandwidth (only compact metadata & anomaly alerts published)"],
          ["Data Privacy & IP Security", "Proprietary product images sent over public internet", "All visual inspection data processed locally inside the machine chassis"],
          ["Actuator Synchronization", "Impossible to synchronize with fast pneumatic reject valves", "Direct microsecond GPIO trigger from edge SoC to pneumatic solenoid driver"],
        ],
        highlightColumnIndex: 2,
      },
    },
    {
      type: "heading",
      level: 2,
      id: "optical-physics-and-sensor-selection",
      text: "2. Industrial Optical Physics: Global Shutter CMOS & Telecentric Lenses",
    },
    {
      type: "paragraph",
      text: "No machine learning algorithm can extract features from an optically blurred or distorted image. Image quality is determined at the physical optical interface. Industrial machine vision specifies two foundational optical hardware components:",
    },
    {
      type: "bullets",
      items: [
        "Global Shutter vs. Rolling Shutter CMOS: Rolling shutter sensors expose pixels line-by-line over 10 to 30 milliseconds. When an object moves across a conveyor at 1.5 m/s, vertical edges appear slanted (spatial distortion). Global shutter sensors (e.g. Sony Pregius IMX296 / IMX287) expose all pixels simultaneously in under 50 microseconds, capturing crystal-clear, distortion-free images of fast-moving products.",
        "Telecentric Lenses for Metrology: Standard entocentric lenses have an angular field of view (FOV). If a part is placed 5 mm closer to the camera, it appears larger in the frame, causing false dimensional rejections. A bilateral telecentric lens only accepts parallel optical rays, maintaining exactly identical magnification (e.g. 0.5x ± 0.05%) across a depth of field of ± 15 mm, enabling sub-pixel dimensional measurement down to ± 0.02 mm.",
      ],
    },
    {
      type: "callout",
      variant: "insight",
      title: "Calculating Camera Exposure Time for Moving Production Lines",
      text: "Maximum allowable exposure time without optical blur: t_exp = (Pixel_Resolution × Target_Blur_Pixels) / Line_Speed. For a line moving at V = 1.0 m/s with a field of view requiring a pixel size of 0.05 mm/pixel and maximum allowable motion blur of 1 pixel: t_exp = (0.05 mm) / (1,000 mm/s) = 50 microseconds. An exposure of 50 µs requires high-intensity pulsed LED strobe illumination.",
    },
    {
      type: "heading",
      level: 2,
      id: "lighting-geometry-and-strobe-synchronization",
      text: "3. Lighting Geometry: Darkfield, Brightfield & Microsecond Strobe Drivers",
    },
    {
      type: "paragraph",
      text: "In industrial machine vision, lighting is not used merely to illuminate—it is used to optically enhance defects and suppress background noise before photons hit the sensor. Selecting the correct illumination geometry is 80% of vision engineering success:",
    },
    {
      type: "table",
      data: {
        caption: "Industrial Lighting Geometries: Topology, Optical Physics & Applications",
        headers: ["Lighting Geometry", "Angle of Incidence", "Optical Physics & Contrast Effect", "Target Inspection Application"],
        rows: [
          ["Direct Brightfield", "60° – 90° (Normal to surface)", "Reflected specular light enters the lens directly; flat surfaces appear bright, dark defects appear black", "PCB component presence, barcode reading, printed text OCR"],
          ["Low-Angle Darkfield", "10° – 25° (Glancing grazing angle)", "Specular light reflects away from lens; only surface scratches, engraving, and edge burrs scatter light into the lens", "Metal sheet scratch detection, laser etching verification, glass crack inspection"],
          ["Diffuse Dome / Coaxial", "Omnidirectional 180° diffusion", "Eliminates hot-spot glare and shadowing on curved, shiny metallic or plastic packaging", "Spherical bearings, metallic can inspection, blister pack blister seals"],
          ["Backlight Illumination", "180° directly behind object", "Creates high-contrast silhouette profile with infinite contrast ratio", "Precision dimensional measurement, screw thread pitch verification, liquid fill level detection"],
        ],
        highlightColumnIndex: 0,
      },
    },
    {
      type: "heading",
      level: 2,
      id: "embedded-ai-hardware-architectures",
      text: "4. Embedded AI Compute: Jetson Orin Nano vs NXP i.MX8M Plus vs Hailo-8",
    },
    {
      type: "paragraph",
      text: "Deploying deep learning on physical machinery requires balancing AI compute throughput (TOPS), power dissipation, thermal cooling within sealed IP65 enclosures, and long-term industrial silicon availability (10+ years):",
    },
    {
      type: "table",
      data: {
        caption: "Edge AI Compute Hardware Comparison for Industrial Machinery",
        headers: ["Platform / Silicon", "AI Accelerator (NPU/GPU)", "Compute (INT8)", "Power (Watts)", "Optimal Industrial Use Case"],
        rows: [
          ["NVIDIA Jetson Orin Nano (8GB)", "1024-core NVIDIA Ampere GPU + 32 Tensor Cores", "40 TOPS", "7W – 15W", "Multi-camera object detection, segmentation (YOLOv8, SegFormer), complex defect classification"],
          ["NXP i.MX8M Plus", "Integrated Vivante VIP8000 NPU", "2.3 TOPS", "3W – 6W", "Low-power single-camera inspection, OCR, presence/absence checking, integrated dual Gigabit Ethernet & CAN-FD"],
          ["Raspberry Pi CM4 + Hailo-8 M.2", "Hailo-8 Deep Learning Co-Processor", "26 TOPS", "5W – 8W", "Modular cost-effective vision upgrades for existing Linux-based industrial kiosks and machines"],
          ["STM32H7 + Edge-AI C-Code", "ARM Cortex-M7 @ 480 MHz (CMSIS-NN quantized)", "0.05 TOPS", "0.5W", "Micro-vision presence detection, simple color sensor classification, sub-cent BOM applications"],
        ],
        highlightColumnIndex: 2,
      },
    },
    {
      type: "heading",
      level: 2,
      id: "deep-learning-models-and-tensorrt-quantization",
      text: "5. Real-Time Deep Learning: YOLOv8-nano, MobileNetV4 & TensorRT INT8",
    },
    {
      type: "paragraph",
      text: "Deploying standard PyTorch or TensorFlow model weights directly onto embedded edge devices results in memory thrashing and slow inference times. Production edge-AI pipelines implement a multi-stage optimization and quantization pipeline:",
    },
    {
      type: "numbered",
      items: [
        "Lightweight Backbone Selection: Use modern compact architectures like YOLOv8-nano (3.2M parameters) or MobileNetV4-Small specifically designed for high feature extraction efficiency with minimal floating-point operations (FLOPs).",
        "Layer Fusion & Graph Optimization: Export PyTorch models to ONNX format and compile using NVIDIA TensorRT. TensorRT automatically fuses Convolution + Batch Normalization + ReLU activation layers into single unified CUDA kernels, eliminating GPU memory read/write round-trips.",
        "INT8 Post-Training Quantization (PTQ): Quantize 32-bit floating-point weights and activation tensors into 8-bit integers using symmetric min-max calibration across a representative dataset of 500 factory images. This cuts memory footprint by 75% and accelerates execution on Tensor Cores by up to 4.2x with < 0.8% drop in mean Average Precision (mAP).",
        "Zero-Copy Pinned Memory Pipeline: Ingest camera frames directly from V4L2 / GigE Vision drivers into GPU pinned unified memory via DMA (Direct Memory Access), eliminating CPU-to-GPU memory copies.",
      ],
    },
    {
      type: "callout",
      variant: "science",
      title: "TensorRT Optimization Benchmark on Jetson Orin Nano (640x640 Input)",
      text: "YOLOv8-nano (PyTorch FP32 baseline): 82.4 ms latency (12.1 FPS, 950 MB VRAM) -> ONNX Runtime (FP16): 28.6 ms latency (35.0 FPS, 380 MB VRAM) -> TensorRT (INT8 Quantized): 9.4 ms latency (106.3 FPS, 195 MB VRAM). Optimization delivers an 8.7x speedup, easily satisfying sub-50ms machine cycle requirements.",
    },
    {
      type: "heading",
      level: 2,
      id: "deterministic-plc-and-reject-integration",
      text: "6. Deterministic I/O Integration: Optoisolated Triggers & Pneumatic Reject Kickers",
    },
    {
      type: "paragraph",
      text: "The bridge between digital AI inference and physical automation is deterministic hardware timing. In a high-speed sorting machine, when an AI model identifies a defective part, a pneumatic solenoid valve must fire exactly when the defective component passes over the reject chute (typically 120 mm to 300 mm downstream):",
    },
    {
      type: "bullets",
      items: [
        "Optical Encoder Position Tracking: An incremental optical rotary encoder mounted on the conveyor roller sends high-speed quadrature pulses (A/B channels) to an STM32 microcontroller timer input in encoder mode. The part's physical position is tracked with 0.1 mm precision regardless of conveyor belt speed variations.",
        "Hardware-Timed Shift Register Queue: When the edge AI engine detects a defect at Frame N, it sends an immediate rejection intent packet over isolated UART/SPI to the microcontroller. The MCU enqueues the target encoder count into a circular hardware FIFO queue.",
        "Direct MOSFET / SSR Solenoid Drive: When the conveyor encoder count matches the target reject position, the MCU timer comparator triggers an optoisolated high-side power MOSFET within 2 microseconds, energizing a 24V high-speed Festo pneumatic blow-off valve (response time ≤ 4 ms) to eject the defective part cleanly into the scrap bin.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "anomaly-detection-and-synthetic-augmentation",
      text: "7. Defect Anomaly Detection: PatchCore, Autoencoders & Synthetic Augmentation",
    },
    {
      type: "paragraph",
      text: "In industrial manufacturing, defective samples are rare (often < 0.1% of total production). Traditional supervised classification struggles because engineers cannot collect thousands of defective images to train balanced neural networks:",
    },
    {
      type: "table",
      data: {
        caption: "Unsupervised Defect Detection vs. Supervised Classification",
        headers: ["Approach", "Training Data Requirement", "Algorithm / Model", "Operational Strengths & Limitations"],
        rows: [
          ["Unsupervised Anomaly Detection", "Train only on 100% 'Good' defect-free parts (100–300 images)", "PatchCore / Deep Autoencoders / Normalizing Flows", "Identifies any unforeseen defect (scratches, dents, foreign objects, missing screws) by calculating visual reconstruction distance; zero defect samples required for initial training."],
          ["Supervised Object Detection", "Requires 500+ annotated bounding boxes per specific defect class", "YOLOv8 / Faster R-CNN", "High accuracy for known, recurring defect types (e.g. solder bridging, missing O-ring), but blind to novel or uncataloged failure modes."],
          ["Generative Synthetic Augmentation", "Seed with 5–10 real defect images + 3D CAD models", "Diffusion Models / Blender CAD rendering with synthetic scratch masks", "Artificially generates 10,000 photorealistic defective variations with automatic pixel-perfect ground truth segmentation masks."],
        ],
        highlightColumnIndex: 0,
      },
    },
    {
      type: "heading",
      level: 2,
      id: "case-study-automated-inspection-machines",
      text: "8. Production Case Study: 120 Parts/Min Real-Time Sorting Architecture",
    },
    {
      type: "paragraph",
      text: "SolveMpire engineered an automated multi-camera sorting and inspection system deployed in high-throughput food packaging and electromechanical assembly machines:",
    },
    {
      type: "table",
      data: {
        caption: "SolveMpire Multi-Camera Edge-AI Inspection System Specifications",
        headers: ["Subsystem Parameter", "Engineering Specification", "Technical Innovation"],
        rows: [
          ["Throughput Capacity", "120 parts per minute (2 parts per second)", "Continuous motion inspection with zero conveyor stopping or mechanical index dwell"],
          ["Camera Configuration", "Dual 2.3 MP Sony IMX296 Global Shutter CMOS", "Top-down telecentric dimensional check + 45° low-angle darkfield surface scratch detection"],
          ["Edge Compute Platform", "NVIDIA Jetson Orin Nano (8GB) in fanless heatsink chassis", "Dual TensorRT INT8 pipelines executing in parallel in 14.2 ms total inference time"],
          ["Classification Accuracy", "99.82% defect detection accuracy (< 0.05% false reject rate)", "Multi-modal fusion combining surface anomaly score with telecentric edge bounding box metrics"],
          ["Actuation Mechanism", "Dual 24V DC high-speed pneumatic blow-off ejectors", "Encoder-synchronized position firing with 1.2 mm spatial repeatability"],
          ["Cloud Telemetry Stream", "MQTT over TLS 1.3 telemetry stream", "Publishes real-time defect Pareto charts, hourly yield statistics, and sample defect thumbnails to cloud dashboards"],
        ],
        highlightColumnIndex: 1,
      },
    },
    {
      type: "heading",
      level: 2,
      id: "edge-vision-engineering-checklist",
      text: "9. The 10-Point Industrial Edge-AI Engineering Checklist",
    },
    {
      type: "paragraph",
      text: "Before deploying computer vision models onto physical automated production lines, evaluate your system against this 10-point engineering checklist:",
    },
    {
      type: "numbered",
      items: [
        "Global Shutter Camera Specification: Never use rolling shutter sensors on moving parts; guarantee simultaneous full-frame pixel exposure.",
        "Telecentric Optics for Metrology: Specify telecentric lenses if verifying dimensional tolerances or part heights to eliminate perspective scaling errors.",
        "Targeted Lighting Geometry: Choose darkfield for scratches, backlight for silhouettes, dome for reflective metals, and brightfield for high-contrast prints.",
        "Microsecond Strobe Driver Synchronization: Drive LED lighting with high-current pulsed strobes (≤ 50 µs pulse width) to freeze motion while preventing thermal LED decay.",
        "NPU TensorRT INT8 Quantization: Quantize all deep neural networks to 8-bit integers on target silicon, keeping inference times strictly under 35 ms.",
        "Zero Cloud Dependency for Core Loop: Ensure image capture, inference, and reject actuation run 100% locally on edge hardware independent of internet connectivity.",
        "Rotary Encoder Position Tracking: Synchronize downstream reject kickers to physical encoder pulses rather than time delays to compensate for conveyor speed jitter.",
        "Unsupervised Anomaly Model Fallback: Implement PatchCore or Autoencoders to detect unmodeled defects without requiring thousands of broken samples.",
        "Fanless Sealed Thermal Enclosure: Package edge AI SoCs (Jetson / NXP) in IP65 aluminum finned enclosures with thermal gap pads to operate reliably up to 55°C ambient.",
        "Cloud MLOps Pipeline: Stream model performance metrics and edge-flagged edge-cases over MQTT to continuously retrain and redeploy improved weights via OTA.",
      ],
    },
    {
      type: "divider",
    },
    {
      type: "cta",
      title: "Integrating AI & Computer Vision into Custom Automated Machinery?",
      text:
        "SolveMpire engineers turnkey automated machines, high-speed edge computer vision pipelines, custom optics, and industrial AI controllers. Partner with our multidisciplinary engineering team to automate your quality inspection.",
      buttonText: "Schedule Engineering Consultation",
      buttonHref: "/contact",
    },
  ],
  faqs: [
    {
      question: "Why can't standard webcams or smartphone cameras be used for industrial vision?",
      answer:
        "Webcams and smartphone cameras use rolling shutter CMOS sensors, non-telecentric lenses with heavy barrel distortion, auto-exposure algorithms that introduce unpredictable latency, and USB protocols lacking hardware trigger synchronization. On an industrial line moving at 1 m/s, rolling shutter causes severe spatial skew, while auto-focus hunting ruins inspection repeatability. Industrial vision requires global shutter sensors, C-mount optics, and microsecond hardware strobe inputs.",
    },
    {
      question: "How does TensorRT INT8 quantization maintain accuracy without floating-point numbers?",
      answer:
        "TensorRT uses calibration algorithms (such as KL-Divergence / Entropy minimization) on a representative dataset of 500–1,000 factory images. It maps the dynamic range of 32-bit floating-point weights and activation tensors to 256 discrete 8-bit integer levels (-128 to +127). By preserving the statistical distribution in key convolutional layers and keeping sensitive layers in FP16 where needed, accuracy loss is typically under 0.5% while delivering 3x to 4x faster throughput.",
    },
    {
      question: "What happens if factory ambient lighting changes between daytime and night shifts?",
      answer:
        "Industrial vision systems eliminate ambient lighting dependency by operating at very short exposure times (e.g. 30 µs) under high-intensity pulsed LED strobe lights that are 10x to 50x brighter than ambient sunlight or overhead factory lamps. Furthermore, camera enclosures often incorporate optical bandpass filters matched to the exact wavelength of the LED strobe (e.g. 630 nm red or 850 nm infrared), completely blocking ambient fluorescent and daylight wavelengths.",
    },
    {
      question: "How do you handle defect detection when you have very few defective sample parts to train on?",
      answer:
        "SolveMpire implements unsupervised anomaly detection algorithms such as PatchCore or deep feature embedding Autoencoders. These models are trained exclusively on 100 to 300 images of known 'good' production parts to learn the nominal visual manifold. During live production, any part with surface scratches, contamination, missing components, or foreign textures creates an anomaly distance spike, flagging the part as defective without requiring historical defect datasets.",
    },
    {
      question: "What is the typical cost and lead time for developing an industrial edge-AI vision system?",
      answer:
        "A turnkey edge-AI vision inspection station (including global shutter camera, telecentric lens, pulsed strobe driver, Jetson Orin compute enclosure, custom deep learning model, and PLC reject integration) typically takes 4 to 8 weeks to develop and deploy, with hardware BOM costs ranging from ₹1.2 Lakh to ₹3.5 Lakh ($1,500 – $4,200 USD) depending on camera resolution and line speeds.",
    },
  ],
};
