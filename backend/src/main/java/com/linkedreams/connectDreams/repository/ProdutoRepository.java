package com.linkedreams.connectDreams.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.linkedreams.connectDreams.model.Categoria;
import com.linkedreams.connectDreams.model.Produto;


@Repository
public interface ProdutoRepository extends JpaRepository<Produto ,Long> {
	
	public List<Produto> findAllByNomeContainingIgnoreCase (String nome);
	
	public List<Produto> findAllByCausaContainingIgnoreCase (String causa);
	
}
		