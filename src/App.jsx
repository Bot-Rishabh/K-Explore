
import { useEffect, useMemo, useState } from 'react'
import './App.css'

const events = [
  {
    id: 1,
    title: 'Neon Nights Festival',
    category: 'Music',
    date: '22 NOV 2026',
    time: '6:00 PM',
    venue: 'Bhubaneswar',
    price: '₹499',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=85',
    description: 'An unforgettable night of live music, electronic beats and incredible performances.',
    tag: 'TRENDING',
  },
  {
    id: 2,
    title: 'TechX Innovation Summit',
    category: 'Technology',
    date: '28 NOV 2026',
    time: '10:00 AM',
    venue: 'KIIT Convention Centre',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=85',
    description: 'Explore emerging technologies, meet innovators and discover the future of tech.',
    tag: 'POPULAR',
  },
  {
    id: 3,
    title: 'Canvas & Coffee',
    category: 'Art',
    date: '05 DEC 2026',
    time: '4:00 PM',
    venue: 'Patia, Bhubaneswar',
    price: '₹299',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=85',
    description: 'A creative afternoon of painting, coffee and meeting fellow art enthusiasts.',
    tag: 'NEW',
  },
  {
    id: 4,
    title: 'The Startup Meetup',
    category: 'Business',
    date: '12 DEC 2026',
    time: '11:00 AM',
    venue: 'Bhubaneswar',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=85',
    description: 'Connect with founders, exchange ideas and turn your next big idea into reality.',
    tag: 'FEATURED',
  },
  {
    id: 5,
    title: 'Beyond The Run',
    category: 'Sports',
    date: '19 DEC 2026',
    time: '6:30 AM',
    venue: 'Kalinga Stadium',
    price: '₹199',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=85',
    description: 'Challenge yourself, meet fellow fitness lovers and make every step count.',
    tag: 'POPULAR',
  },
  {
    id: 6,
    title: 'Rhythm & Soul',
    category: 'Music',
    date: '26 DEC 2026',
    time: '7:00 PM',
    venue: 'Bhubaneswar',
    price: '₹399',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&q=85',
    description: 'Experience an evening of unforgettable performances and good vibes.',
    tag: 'NEW',
  },
]

const categories = ['All Events', 'Music', 'Technology', 'Art', 'Business', 'Sports']

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Events')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [registrations, setRegistrations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kexplore-registrations')) || []
    } catch {
      return []
    }
  })
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    localStorage.setItem('kexplore-registrations', JSON.stringify(registrations))
  }, [registrations])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        category === 'All Events' || event.category === category

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [category, search])

  function handleRegister(e) {
    e.preventDefault()

    const registration = {
      ...form,
      event: selectedEvent.title,
      registeredAt: new Date().toISOString(),
    }

    setRegistrations((previous) => [...previous, registration])
    setSuccess(true)
    setForm({ name: '', email: '', phone: '' })
  }

  function closeModal() {
    setSelectedEvent(null)
    setSuccess(false)
  }

  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#09090f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="text-2xl font-black tracking-tight">
            K<span className="text-violet-500">.</span>EXPLORE
          </a>

          <div className="hidden items-center gap-9 text-sm text-gray-400 md:flex">
            <a href="#home" className="transition hover:text-white">Home</a>
            <a href="#events" className="transition hover:text-white">Explore Events</a>
            <a href="#about" className="transition hover:text-white">About</a>
          </div>

          <a
            href="#events"
            className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-violet-500"
          >
            Explore Now ↗
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold tracking-widest text-violet-300">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              DISCOVER. CONNECT. EXPERIENCE.
            </div>

            <h1 className="text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Life is an
              <span className="block text-violet-400">event.</span>
              Make it
              <span className="block">memorable.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-gray-400">
              Discover experiences worth remembering. From electrifying
              concerts to inspiring meetups, find your next unforgettable
              moment with K Explore.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#events"
                className="rounded-full bg-violet-600 px-7 py-4 font-semibold transition hover:-translate-y-1 hover:bg-violet-500"
              >
                Discover Events ↗
              </a>
              <a
                href="#about"
                className="rounded-full border border-white/20 px-7 py-4 font-semibold text-gray-300 transition hover:border-violet-400 hover:text-white"
              >
                Learn More
              </a>
            </div>

            <div className="mt-12 flex gap-10">
              <div>
                <p className="text-3xl font-black">50<span className="text-violet-400">+</span></p>
                <p className="mt-1 text-sm text-gray-500">Experiences</p>
              </div>
              <div>
                <p className="text-3xl font-black">10<span className="text-violet-400">+</span></p>
                <p className="mt-1 text-sm text-gray-500">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-black">1K<span className="text-violet-400">+</span></p>
                <p className="mt-1 text-sm text-gray-500">Possibilities</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-violet-600/20 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1100&q=90"
              alt="Crowd enjoying a live music event"
              className="relative h-[430px] w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/50 p-5 backdrop-blur-xl">
              <p className="text-xs font-semibold tracking-widest text-violet-300">YOUR NEXT EXPERIENCE</p>
              <p className="mt-2 text-xl font-bold">Something unforgettable awaits.</p>
            </div>
          </div>
        </div>
      </header>

      {/* EVENTS */}
      <section id="events" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-sm font-bold tracking-[0.25em] text-violet-400">THE EXPERIENCE STARTS HERE</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Explore <span className="text-violet-400">Events.</span>
            </h2>
            <p className="mt-4 text-gray-400">Find something exciting happening around you.</p>
          </div>
          <p className="text-sm text-gray-500">{filteredEvents.length} events found</p>
        </div>

        {/* SEARCH */}
        <div className="mb-7">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="⌕  Search events, categories or venues..."
            className="w-full rounded-2xl border border-white/10 bg-[#13131d] px-6 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500"
          />
        </div>

        {/* CATEGORY FILTERS */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? 'bg-violet-600 text-white'
                  : 'border border-white/10 bg-[#13131d] text-gray-400 hover:border-violet-500 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* EVENT CARDS */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-[#13131d] transition duration-300 hover:-translate-y-2 hover:border-violet-500/50"
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-violet-600 px-3 py-1.5 text-xs font-bold tracking-wider">
                  {event.tag}
                </span>
                <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-sm font-bold backdrop-blur">
                  {event.price}
                </span>
              </div>

              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-violet-400">
                  {event.category}
                </p>
                <h3 className="mt-3 text-xl font-bold transition group-hover:text-violet-300">
                  {event.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">
                  {event.description}
                </p>

                <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm text-gray-400">
                  <p>◷ &nbsp;{event.date} · {event.time}</p>
                  <p>⌖ &nbsp;{event.venue}</p>
                </div>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="mt-6 w-full rounded-xl border border-violet-500/50 py-3 font-semibold text-violet-300 transition hover:bg-violet-600 hover:text-white"
                >
                  View Details & Register ↗
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-[#13131d] py-20 text-center">
            <p className="text-4xl">⌕</p>
            <h3 className="mt-4 text-xl font-bold">No events found</h3>
            <p className="mt-2 text-gray-400">Try another search or category.</p>
            <button
              onClick={() => {
                setSearch('')
                setCategory('All Events')
              }}
              className="mt-5 text-violet-400 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-white/10 bg-[#11111a] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold tracking-[0.25em] text-violet-400">WHY K EXPLORE?</p>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            More than just <span className="text-violet-400">events.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-400">
            We believe the best memories happen when people come together.
            K Explore makes discovering exciting experiences simple,
            accessible and memorable.
          </p>
          <div className="mt-12 grid gap-5 text-left sm:grid-cols-3">
            {[
              ['✦', 'Discover', 'Find experiences that match your interests.'],
              ['◎', 'Connect', 'Meet people who share your passions.'],
              ['↗', 'Experience', 'Turn ordinary days into great memories.'],
            ].map(([icon, title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-[#09090f] p-7">
                <p className="text-3xl text-violet-400">{icon}</p>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xl font-black">K<span className="text-violet-500">.</span>EXPLORE</p>
            <p className="mt-2 text-sm text-gray-500">Discover. Connect. Experience.</p>
          </div>
          <p className="text-sm text-gray-500">© 2026 K Explore. All rights reserved.</p>
        </div>
      </footer>

      {/* REGISTRATION MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="my-auto w-full max-w-lg rounded-3xl border border-white/10 bg-[#171722] p-7 shadow-2xl sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest text-violet-400">EVENT REGISTRATION</p>
                <h2 className="mt-2 text-2xl font-black">{selectedEvent.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{selectedEvent.date} · {selectedEvent.venue}</p>
              </div>
              <button onClick={closeModal} className="text-2xl text-gray-400 hover:text-white" aria-label="Close">×</button>
            </div>

            {success ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400">✓</div>
                <h3 className="mt-5 text-2xl font-bold">You're registered!</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Your registration for {selectedEvent.title} has been saved successfully.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-7 w-full rounded-xl bg-violet-600 py-3 font-bold hover:bg-violet-500"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Full Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Email Address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Phone Number</label>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    title="Enter a valid 10-digit phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Selected Event</label>
                  <input
                    readOnly
                    value={selectedEvent.title}
                    className="w-full rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 text-gray-400 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-violet-600 py-4 font-bold transition hover:bg-violet-500"
                >
                  Complete Registration ↗
                </button>
                <p className="text-center text-xs text-gray-500">
                  Your registration details are saved in this browser.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
