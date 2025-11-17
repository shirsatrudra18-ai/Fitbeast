import Link from "next/link";

const trainers = [
  {
    initials: "SK",
    name: "Sanjay Kumar",
    role: "Head Trainer & HIIT Specialist",
    certifications: ["NASM-CPT", "HIIT Certified", "Nutrition Coach"],
    specialties: ["Weight Loss", "HIIT", "Strength Training"],
    bio:
      "With 8+ years of experience, Sanjay specializes in high-intensity training and has helped hundreds of clients achieve their transformation goals.",
    availability: "Available: Mon, Wed, Fri 8AM-2PM",
  },
  {
    initials: "MI",
    name: "Mohan Iyer",
    role: "Strength & Conditioning Coach",
    certifications: ["CSCS", "Olympic Lifting", "Powerlifting Coach"],
    specialties: ["Powerlifting", "Strength", "Sports Performance"],
    bio:
      "Former competitive powerlifter with 10 years of coaching experience. Mohan focuses on building serious strength and athletic performance.",
    availability: "Available: Tue, Thu 9AM-6PM",
  },
  {
    initials: "AS",
    name: "Ananya Sharma",
    role: "Yoga & Pilates Instructor",
    certifications: ["RYT-500", "Pilates Certified", "Mindfulness Coach"],
    specialties: ["Yoga", "Pilates", "Flexibility", "Recovery"],
    bio:
      "Ananya brings a holistic approach to fitness, focusing on mind-body connection, flexibility, and recovery for complete wellness.",
    availability: "Available: Mon-Fri 9AM-3PM",
  },
  {
    initials: "KS",
    name: "Karan Singh",
    role: "CrossFit & Boxing Coach",
    certifications: ["CrossFit Level 2", "Group Boxing", "Mobility Specialist"],
    specialties: ["CrossFit", "Conditioning", "Functional Fitness"],
    bio:
      "High-energy coach specializing in functional fitness and combat sports. Classes are intense, fun, and incredibly effective.",
    availability: "Available: Mon, Wed, Thu 4PM-9PM",
  },
  {
    initials: "LP",
    name: "Lata Patel",
    role: "Group Fitness Director",
    certifications: ["ACE-CPT", "Dance Aerobics", "Group Fitness"],
    specialties: ["Dance Fitness", "Core Training", "Group Classes"],
    bio:
      "Lata creates engaging, motivating group classes that make fitness fun. Her infectious energy keeps members coming back!",
    availability: "Available: Tue, Thu 12PM-8PM",
  },
  {
    initials: "RV",
    name: "Rahul Verma",
    role: "Sports Nutritionist",
    certifications: ["CNS", "Sports Nutrition", "Meal Planning"],
    specialties: ["Nutrition", "Meal Planning", "Body Composition"],
    bio:
      "Rahul works with members to create personalized nutrition plans that complement their training for optimal results.",
    availability: "Available: Mon-Fri by Appointment",
  },
] as const;

function Badge({ label, variant = "default" }: { label: string; variant?: "default" | "blue" }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2";
  const styles =
    variant === "blue"
      ? "bg-blue-600 text-white"
      : "bg-white/10 text-gray-200 border border-white/10";
  return <span className={`${base} ${styles}`}>{label}</span>;
}

function TrainerCard({
  t,
}: {
  t: (typeof trainers)[number];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow">
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-3xl font-extrabold">
          {t.initials}
        </div>
        <div>
          <h3 className="text-2xl font-extrabold">{t.name}</h3>
          <p className="text-blue-400 font-semibold mt-1">{t.role}</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold">Certifications</h4>
        <div className="mt-2 flex flex-wrap">
          {t.certifications.map((c) => (
            <Badge key={c} label={c} />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-semibold">Specialties</h4>
        <div className="mt-2 flex flex-wrap">
          {t.specialties.map((s) => (
            <Badge key={s} label={s} variant="blue" />
          ))}
        </div>
      </div>

      <p className="mt-4 text-gray-300">{t.bio}</p>
      <p className="mt-3 text-sm text-gray-400">{t.availability}</p>

      <Link
        href="/classes"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
      >
        Book Session
      </Link>
    </div>
  );
}

export default function TrainersPage() {
  return (
    <main className="py-14">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold">Our Expert Trainers</h1>
          <p className="mt-3 text-lg text-gray-300">
            Certified professionals dedicated to your success
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t) => (
            <TrainerCard key={t.name} t={t} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to Work with Our Trainers?</h3>
          <p className="mt-2 text-gray-300 text-sm">
            All memberships include access to trainer support on the gym floor. Book personal training sessions or get one-on-one guidance.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link href="/programs" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500">JOIN FREE TRIAL</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
