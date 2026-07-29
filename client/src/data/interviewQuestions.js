export const INTERVIEW_CATEGORIES = [
  {
    icon: '🖥️',
    title: 'Operating Systems',
    questions: [
      { q: 'What is a deadlock, and what are the four necessary conditions for it?', a: 'A deadlock is a state where a set of processes are blocked because each is waiting for a resource held by another. The four necessary conditions are mutual exclusion, hold and wait, no preemption, and circular wait.' },
      { q: 'What is the difference between a process and a thread?', a: "A process is an independent program in execution with its own memory space. A thread is a lightweight unit of execution within a process that shares the process's memory with other threads." },
      { q: 'What is virtual memory, and why is it used?', a: 'Virtual memory lets a process use more memory than is physically available by mapping virtual addresses to physical ones, swapping data between RAM and disk as needed. It gives each process an isolated address space.' },
      { q: 'Explain the difference between paging and segmentation.', a: "Paging divides memory into fixed-size blocks, avoiding external fragmentation but allowing internal fragmentation. Segmentation divides memory into variable-size logical units based on a program's structure." },
      { q: 'What is a race condition, and how is it prevented?', a: 'A race condition occurs when multiple threads access shared data concurrently and the outcome depends on timing. It is prevented using synchronization primitives like mutexes or semaphores.' },
    ],
  },
  {
    icon: '🗄️',
    title: 'DBMS',
    questions: [
      { q: 'What is normalization, and why is it important?', a: 'Normalization organizes tables to reduce data redundancy and avoid update, insert, and delete anomalies, typically by decomposing tables according to normal forms (1NF, 2NF, 3NF, BCNF).' },
      { q: 'Explain the ACID properties of a transaction.', a: "Atomicity ensures a transaction fully completes or fully rolls back. Consistency ensures valid state transitions. Isolation ensures concurrent transactions don't interfere. Durability ensures committed changes survive a crash." },
      { q: 'What is the difference between a primary key and a foreign key?', a: 'A primary key uniquely identifies each row in its own table. A foreign key is a column in one table that references the primary key of another, enforcing referential integrity.' },
      { q: 'What is indexing, and what is the tradeoff of adding one?', a: 'An index is a data structure, commonly a B-tree, that speeds up lookups on a column. The tradeoff is extra storage and slower writes, since the index must also be updated.' },
      { q: 'What is the difference between DELETE, TRUNCATE, and DROP?', a: 'DELETE removes rows and can be rolled back and filtered with WHERE. TRUNCATE removes all rows quickly and resets identity but cannot be filtered. DROP removes the entire table structure.' },
    ],
  },
  {
    icon: '🌐',
    title: 'Computer Networks',
    questions: [
      { q: 'What happens when you type a URL into a browser?', a: 'The browser resolves the domain via DNS, establishes a TCP connection (and TLS handshake for HTTPS), sends an HTTP request, and the server responds with the page content, which the browser then renders.' },
      { q: 'What is the difference between TCP and UDP?', a: 'TCP is connection-oriented, reliable, and ordered, using handshakes and acknowledgments. UDP is connectionless and unreliable but faster, used where speed matters more than guaranteed delivery, like video streaming.' },
      { q: 'What is the difference between HTTP and HTTPS?', a: 'HTTPS is HTTP layered over TLS/SSL, encrypting data in transit and verifying server identity via certificates, preventing eavesdropping and man-in-the-middle attacks.' },
      { q: 'Explain the three-way handshake in TCP.', a: 'The client sends a SYN, the server responds with SYN-ACK, and the client replies with ACK. This establishes a reliable connection before data transfer begins.' },
    ],
  },
  {
    icon: '🧱',
    title: 'OOP Concepts',
    questions: [
      { q: 'What are the four pillars of OOP?', a: 'Encapsulation (bundling data and methods, restricting direct access), Abstraction (hiding implementation details), Inheritance (reusing behavior across a class hierarchy), and Polymorphism (a single interface, multiple implementations).' },
      { q: 'What is the difference between method overloading and overriding?', a: 'Overloading is defining multiple methods with the same name but different parameters within the same class, resolved at compile time. Overriding is redefining a parent class method in a subclass, resolved at runtime.' },
      { q: 'What is the difference between an abstract class and an interface?', a: 'An abstract class can have both implemented and unimplemented methods and supports single inheritance. An interface (in most languages) traditionally only declares method signatures and supports multiple inheritance of type.' },
      { q: 'What is composition, and how does it differ from inheritance?', a: '"Is-a" relationships use inheritance; "has-a" relationships use composition, where a class contains an instance of another class instead of extending it. Composition is generally favored for flexibility.' },
    ],
  },
];
