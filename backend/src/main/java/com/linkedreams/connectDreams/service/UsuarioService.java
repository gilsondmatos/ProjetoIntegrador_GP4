package com.linkedreams.connectDreams.service;

import java.nio.charset.Charset;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.linkedreams.connectDreams.model.Usuario;
import com.linkedreams.connectDreams.model.UsuarioLogin;
import com.linkedreams.connectDreams.repository.UsuarioRepository;



@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository repository;

	public Optional<Usuario> CadastrarUsuario(Usuario usuario) {
		
		if(repository.findByEmail(usuario.getEmail()).isPresent())
			return null;
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		String senhaEncoder = encoder.encode(usuario.getSenha());
		usuario.setSenha(senhaEncoder);

		return Optional.of(repository.save(usuario));
	}
	
	

	public Optional<UsuarioLogin> Logar(Optional<UsuarioLogin> user) {

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Usuario> usuario = repository.findByEmail(user.get().getEmail());

		if (usuario.isPresent()) {
			if (encoder.matches(user.get().getSenha(), usuario.get().getSenha())) {

				String auth = user.get().getEmail() + ":" + user.get().getSenha();
				byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader = "Basic " + new String(encodedAuth);

				user.get().setToken(authHeader);				
				user.get().setNome_completo(usuario.get().getNome_completo());
				user.get().setId(usuario.get().getId());
                user.get().setTipo(usuario.get().getTipo());
                user.get().setEmail(usuario.get().getEmail());
               
                return user;

			}
		}
		return null;
	}
	
	/*public Optional<Usuario> atualizarUsuario(Usuario usuario) {
		if (repository.findById(usuario.getId()).isEmpty()) 
			return null;
		if (repository.findByUsuario(usuario.getUsuario()).isPresent())
			return null;

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		String senhaEncoder = encoder.encode(usuario.getSenha());
		usuario.setSenha(senhaEncoder);

		return Optional.of(repository.save(usuario));
	}*/

}