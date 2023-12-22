import React, { useState } from 'react';

function FAQComponent() {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (index) => {
    if (activeItem === index) {
      setActiveItem(null);
    } else {
      setActiveItem(index);
    }
  };

  return (
    <div className='card'>
        <div className="card-body">
      <h5 className="card-title">Laborum dolorem quam porro</h5>
      <div className="accordion accordion-flush" id="faq-group-1">
        {FAQData.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${activeItem === index ? 'show' : 'collapsed'}`}
                data-bs-target={`#faqsOne-${index + 1}`}
                type="button"
                onClick={() => toggleItem(index)}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={`faqsOne-${index + 1}`}
              className={`accordion-collapse collapse ${activeItem === index ? 'show' : ''}`}
              data-bs-parent="#faq-group-1"
            >
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
}

const FAQData = [
  {
    question: 'Debitis adipisci eius?',
    answer: 'Ut quasi odit odio totam accusamus vero eius. Nostrum asperiores voluptatem eos nulla ab dolores est asperiores iure. Quo est quis praesentium aut maiores. Corrupti sed aut expedita fugit vero dolorem. Nemo rerum sapiente. A quaerat dignissimos.',
  },
  {
    question: 'Omnis fugiat quis repellendus?',
    answer: 'In minus quia impedit est quas deserunt deserunt et. Nulla non quo dolores minima fugiat aut saepe aut inventore. Qui nesciunt odio officia beatae iusto sed voluptatem possimus quas. Officia vitae sit voluptatem nostrum a.',
  },
  {
    question: 'Et occaecati praesentium aliquam modi incidunt?',
    answer: 'Voluptates magni amet enim perspiciatis atque excepturi itaque est. Sit beatae animi incidunt eum repellat sequi ea saepe inventore. Id et vel et et. Nesciunt itaque corrupti quia ducimus. Consequatur maiores voluptatum fuga quod ut non fuga.',
  },
  {
    question: 'Quo unde eaque vero dolor quis ipsam?',
    answer: 'Numquam ut reiciendis aliquid. Quia veritatis quasi ipsam sed quo ut eligendi et non. Doloremque sed voluptatem at in voluptas aliquid dolorum.',
  },
  {
    question: 'Natus sunt quo atque mollitia accusamus?',
    answer: 'Aut necessitatibus maxime quis dolor et. Nihil laboriosam molestiae qui molestias placeat corrupti non quo accusamus. Nemo qui quis harum enim sed. Aliquam molestias pariatur delectus voluptas quidem qui rerum id quisquam. Perspiciatis voluptatem voluptatem eos. Vel aut minus labore at rerum eos.',
  },
];

export default FAQComponent;
