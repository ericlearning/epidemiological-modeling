import numpy as np

class SIR:
    def __init__(self, beta, gamma, N):
        self.beta = beta
        self.gamma = gamma
        self.N = N
    
    def ds_dt(self, S, I, R):
        return -(self.beta * I * S) / self.N
    
    def di_dt(self, S, I, R):
        return (self.beta * I * S) / self.N - self.gamma * I
    
    def dr_dt(self, S, I, R):
        return self.gamma * I
    
    def interact(self, all, _):
        S, I, R = all
        ds_dt = self.ds_dt(S, I, R)
        di_dt = self.di_dt(S, I, R)
        dr_dt = self.dr_dt(S, I, R)
        print(ds_dt, S, I, R, self.N)
        return np.array([ds_dt, di_dt, dr_dt])

class SIRS:
    def __init__(self, beta, gamma, tau, N):
        self.beta = beta
        self.gamma = gamma
        self.tau = tau
        self.N = N
    
    def ds_dt(self, S, I, R):
        return -(self.beta * I * S) / self.N + self.tau * R
    
    def di_dt(self, S, I, R):
        return (self.beta * I * S) / self.N - self.gamma * I
    
    def dr_dt(self, S, I, R):
        return self.gamma * I - self.tau * R

    def interact(self, all, _):
        S, I, R = all
        ds_dt = self.ds_dt(S, I, R)
        di_dt = self.di_dt(S, I, R)
        dr_dt = self.dr_dt(S, I, R)
        return np.array([ds_dt, di_dt, dr_dt])

class SEIR:
    def __init__(self, beta, gamma, delta, N):
        self.beta = beta
        self.gamma = gamma
        self.delta = delta
        self.N = N
    
    def ds_dt(self, S, E, I, R):
        return -(self.beta * I * S) / self.N
    
    def de_dt(self, S, E, I, R):
        return (self.beta * I * S) / self.N - self.delta * E

    def di_dt(self, S, E, I, R):
        return self.delta * E - self.gamma * I
    
    def dr_dt(self, S, E, I, R):
        return self.gamma * I

    def interact(self, all, _):
        S, E, I, R = all
        ds_dt = self.ds_dt(S, E, I, R)
        de_dt = self.de_dt(S, E, I, R)
        di_dt = self.di_dt(S, E, I, R)
        dr_dt = self.dr_dt(S, E, I, R)
        return np.array([ds_dt, de_dt, di_dt, dr_dt])